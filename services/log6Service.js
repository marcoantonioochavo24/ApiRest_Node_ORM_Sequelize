import { Log6 } from "../models/log6.js";

export async function getAll() {
  return Log6.findAll();
}

export async function getById(id) {
  return Log6.findByPk(id);
}

export async function create(data) {
  return Log6.create(data);
}

export async function update(id, data) {
  const item = await Log6.findByPk(id);
  if (!item) return null;
  await item.update(data);
  return item;
}

export async function remove(id) {
  const item = await Log6.findByPk(id);
  if (!item) return null;
  await item.destroy();
  return item;
}
