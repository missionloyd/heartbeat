const express = require("express");
const db = require("../../lib/db");
// import { checkCache, setCache } from '../../middleware/Cache';

const router = express.Router();

// get data from the last 24 hours
function spaceLatestRouter(cache, cacheTTL) {
  router.get("/", async (_req, res) => {

    let data = []
  
    const selectQuery = `
      SELECT * from (
        SELECT *, ROW_NUMBER() OVER (PARTITION BY bldgname ORDER BY ts DESC) r
        FROM spaces
      ) T
      WHERE T.r=1
    `
    
    try {
      data = (await db.query(selectQuery)).rows
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
};

module.exports = { spaceLatestRouter };
