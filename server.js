import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { sequelize } from "./config/db.js";

import "./models/productos.js";
import "./models/log.js";
import "./models/log6.js";
import "./models/log8.js";
import "./models/log9.js";



const app = express();
app.use(express.json());

// Necesario para poder usar rutas relativas con import/export
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carga automáticamente todas las rutas de la carpeta /routes
function cargarRutas() {
  const rutasPath = path.join(__dirname, "routes");

  const archivos = fs
    .readdirSync(rutasPath)
    .filter((archivo) => archivo.endsWith("Routes.js"));

  archivos.forEach(async (archivo) => {
    const recurso = archivo.replace("Routes.js", "");
    const modulo = await import(`./routes/${archivo}`);

    // Cada archivo de rutas debe exportar el router por defecto
    app.use(`/${recurso}`, modulo.default);
    console.log(`Ruta cargada: /${recurso}`);
  });
}

(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Tablas sincronizadas");

    cargarRutas();

    const PORT = 3000;
    app.listen(PORT, () =>
      console.log(`Servidor escuchando en http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error("Error al arrancar el servidor:", error);
  }
})();

// COMANDOS: 

// node autocrud.js

// node server.js 

// Probar en el navegador: GET http://localhost:3000/log

