const initOptions = {};
const pgp = require("pg-promise")(initOptions);
const dbStringConfig = require("../config/dbConfig.js");

// Lấy String connect để kết nối database
const db = pgp(dbStringConfig);

async function getAllAccounts() {
  const rs = await db.any('SELECT * FROM "accounts"');
  return rs;
}

async function getAccountByUsername(username) {
  const rs = await db.any('SELECT * FROM "accounts" WHERE username = $1', [
    username,
  ]);
  return rs;
}

async function createNewAccount(account) {
  const rs = await db.one(
    'INSERT INTO "accounts"(username, password) VALUES($1, $2) RETURNING *',
    [account.username, account.password]
  );
}

async function deleteTask(task) {
  const rs = await db.one('DELETE FROM "tasks" WHERE id = $1 RETURNING *', [
    task.id,
    task.name,
    task.status,
  ]);
}

async function editTask(task) {
  const rs = await db.one(
    'UPDATE "tasks" SET name = $2 WHERE id = $1 RETURNING *',
    [task.id, task.name, task.status]
  );
}

async function completeTask(task) {
  const rs = await db.one(
    'UPDATE "tasks" SET status = $3 WHERE id = $1 RETURNING *',
    [task.id, task.name, task.status]
  );
}

module.exports = {
  getAllAccounts,
  createNewAccount,
  getAccountByUsername,
};
