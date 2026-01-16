import fs from "fs";
import path from "path";

const modelsPath = "./models";
const controllersPath = "./controllers";
const controllersBasePath = "./controllers/base";
const servicesPath = "./services";
const routesPath = "./routes";

fs.mkdirSync(controllersPath, { recursive: true });
fs.mkdirSync(controllersBasePath, { recursive: true });
fs.mkdirSync(servicesPath, { recursive: true });
fs.mkdirSync(routesPath, { recursive: true });

const models = fs
  .readdirSync(modelsPath)
  .filter((f) => f.endsWith(".js") && f !== "init-models.js");

function aSingular(nombre) {
  if (nombre.endsWith("es")) return nombre.slice(0, -2);
  if (nombre.endsWith("s")) return nombre.slice(0, -1);
  return nombre;
}

for (const modelFile of models) {
  const modelName = path.basename(modelFile, ".js"); // productos
  const singular = aSingular(modelName); // producto
  const ModelVar = singular.charAt(0).toUpperCase() + singular.slice(1); // Producto

  // Service: usa el modelo tal como lo tienes exportado (export const Producto = ...)
  const serviceContent = `import { ${ModelVar} } from "../models/${modelFile}";

export async function getAll() {
  return ${ModelVar}.findAll();
}

export async function getById(id) {
  return ${ModelVar}.findByPk(id);
}

export async function create(data) {
  return ${ModelVar}.create(data);
}

export async function update(id, data) {
  const item = await ${ModelVar}.findByPk(id);
  if (!item) return null;
  await item.update(data);
  return item;
}

export async function remove(id) {
  const item = await ${ModelVar}.findByPk(id);
  if (!item) return null;
  await item.destroy();
  return item;
}
`;

  fs.writeFileSync(`${servicesPath}/${modelName}Service.js`, serviceContent);

  // Controller base: llama al service
  const controllerBaseContent = `import * as service from "../../services/${modelName}Service.js";

export async function crear(req, res) {
  try {
    const nuevo = await service.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear ${singular}", error });
  }
}

export async function obtenerTodos(req, res) {
  try {
    const lista = await service.getAll();
    res.json(lista);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener ${modelName}", error });
  }
}

export async function obtenerUno(req, res) {
  try {
    const item = await service.getById(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    res.json(item);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener ${singular}", error });
  }
}

export async function actualizar(req, res) {
  try {
    const item = await service.update(req.params.id, req.body);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    res.json(item);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar ${singular}", error });
  }
}

export async function eliminar(req, res) {
  try {
    const item = await service.remove(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    res.json({ mensaje: "${singular} eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar ${singular}", error });
  }
}
`;

  fs.writeFileSync(
    `${controllersBasePath}/${modelName}BaseController.js`,
    controllerBaseContent
  );

  // Controller normal: si ya existe no lo tocamos (para que puedas personalizarlo)
  const controllerFile = `${controllersPath}/${modelName}Controller.js`;

  if (!fs.existsSync(controllerFile)) {
    const controllerContent = `import * as base from "./base/${modelName}BaseController.js";

export const crear = base.crear;
export const obtenerTodos = base.obtenerTodos;
export const obtenerUno = base.obtenerUno;
export const actualizar = base.actualizar;
export const eliminar = base.eliminar;
`;

    fs.writeFileSync(controllerFile, controllerContent);
  }

  // Routes: se regeneran siempre
  const routeContent = `import express from "express";
import {
  crear,
  obtenerTodos,
  obtenerUno,
  actualizar,
  eliminar
} from "../controllers/${modelName}Controller.js";

const router = express.Router();

router.get("/", obtenerTodos);
router.get("/:id", obtenerUno);
router.post("/", crear);
router.put("/:id", actualizar);
router.delete("/:id", eliminar);

export default router;
`;

  fs.writeFileSync(`${routesPath}/${modelName}Routes.js`, routeContent);

  console.log("CRUD generado para:", modelName);
}

console.log("Todo generado.");
