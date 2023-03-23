import * as userRepository from "./auth.js";

export async function getAll() {}

export async function getAllByUsername(username) {}

export async function getById(id) {}

export async function create(text, userId) {}

export async function update(id, text) {}

/**
 * javascript 자체에서 delete는 이미 선점하고 있으므로 다른 이름으로
 */
export async function remove(id) {}
