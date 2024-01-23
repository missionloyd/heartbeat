const express = require("express");
const { formatQuery } = require("react-querybuilder");
const db = require("../lib/db");
const { processSQL } = require('../utils/processSQL');

const router = express.Router();

// main react-querybuilder function (links to query page)
function recordsRouter(cache, cacheTTL) {
  router.post("/", async (req, res) => {
    const { query, table } = req.body;
  
    const { sql, params } = formatQuery(query, {
      format: "parameterized",
    });
    
    const whereClause = processSQL(sql);
    const selectRawData = `SELECT * FROM ${table} WHERE ${whereClause}`;
  
    let data = [];
  
    try {
      data = (await db.query(selectRawData, params)).rows;
    } catch (error) {
      console.log(error);
      return res.json({ 
        data: [], 
        status: 500,
        message: error
      });
    }
  
    return res.json({
      data,
      status: 'ok',
    });
  });

  return router;
}

module.exports = { recordsRouter };
