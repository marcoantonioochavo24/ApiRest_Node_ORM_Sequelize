import { Log8 } from "../models/log8.js";

export async function getAll() {
  return Log8.findAll();
}

export async function getById(id) {
  return Log8.findByPk(id);
}

export async function create(data) {
  return Log8.create(data);
}

export async function update(id, data) {
  const item = await Log8.findByPk(id);
  if (!item) return null;
  await item.update(data);
  return item;
}

export async function remove(id) {
  const item = await Log8.findByPk(id);
  if (!item) return null;
  await item.destroy();
  return item;
}
