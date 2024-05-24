const { Router } = require("express");
const { getTables } = require("../get_routes/get_tables");

const tablesRouter = Router();

tablesRouter.get("/", async (req, res) => {
  const data = await getTables();

  res.writeHead(200, { "Content-Type": "application/json" });

  return res.end(JSON.stringify({ data }));
});

module.exports = tablesRouter;
