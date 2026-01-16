import * as service from "../../services/productosService.js";

export async function crear(req, res) {
  try {
    const nuevo = await service.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear producto", error });
  }
}

export async function obtenerTodos(req, res) {
  try {
    const lista = await service.getAll();
    res.json(lista);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener productos", error });
  }
}

export async function obtenerUno(req, res) {
  try {
    const item = await service.getById(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    res.json(item);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener producto", error });
  }
}

export async function actualizar(req, res) {
  try {
    const item = await service.update(req.params.id, req.body);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    res.json(item);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar producto", error });
  }
}

export async function eliminar(req, res) {
  try {
    const item = await service.remove(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    res.json({ mensaje: "producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar producto", error });
  }
}
