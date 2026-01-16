import { Producto } from "../models/productos.js";

export async function getAll() {
  return Producto.findAll();
}

export async function getById(id) {
  return Producto.findByPk(id);
}

export async function create(data) {
  return Producto.create(data);
}

export async function update(id, data) {
  const item = await Producto.findByPk(id);
  if (!item) return null;
  await item.update(data);
  return item;
}

export async function remove(id) {
  const item = await Producto.findByPk(id);
  if (!item) return null;
  await item.destroy();
  return item;
}
