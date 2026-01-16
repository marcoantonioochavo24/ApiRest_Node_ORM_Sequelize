import { Log9 } from "../models/log9.js";

export async function getAll() {
  return Log9.findAll();
}

export async function getById(id) {
  return Log9.findByPk(id);
}

export async function create(data) {
  return Log9.create(data);
}

export async function update(id, data) {
  const item = await Log9.findByPk(id);
  if (!item) return null;
  await item.update(data);
  return item;
}

export async function remove(id) {
  const item = await Log9.findByPk(id);
  if (!item) return null;
  await item.destroy();
  return item;
}
