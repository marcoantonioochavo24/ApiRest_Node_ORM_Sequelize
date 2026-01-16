import { Log } from "../models/log.js";

export async function getAll() {
  return Log.findAll();
}

export async function getById(id) {
  return Log.findByPk(id);
}

export async function create(data) {
  return Log.create(data);
}

export async function update(id, data) {
  const item = await Log.findByPk(id);
  if (!item) return null;
  await item.update(data);
  return item;
}

export async function remove(id) {
  const item = await Log.findByPk(id);
  if (!item) return null;
  await item.destroy();
  return item;
}
