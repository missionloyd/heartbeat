const db = require("../lib/db");

async function getTables() {

  const tables = await db.getAllTables();

  return tables;
}

module.exports = { getTables };
