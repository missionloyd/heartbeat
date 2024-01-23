const express = require("express");
const db = require("../../lib/db");
// import { checkCache, setCache } from '../../middleware/Cache';

const router = express.Router();

// get data points for a space (default in days)
function spacePointsRouter(cache, cacheTTL) {
  router.post("/", async (req, res) => {
    const { bldgname, startDate, endDate, datelevel, table, context } = req.body;
  
    let data = []
    const campus = context;
  
    if (!startDate || !endDate || !datelevel) {
      console.log('*** Missing Data (/points) ***')
      return res.json({
        data,
        status: 'bad',
        message: 'missing data'
      });
    }
      
    const adjustedDateRange = `ts >= '${startDate}' AND ts <= '${endDate}'`
    let spaceWhereClause = ``;
  
    // user specifies "grab all buildings in this table"
    if (!bldgname) {
      spaceWhereClause = adjustedDateRange
    }
    // default option if bldgname is included and is not a campus
    else {
      spaceWhereClause = `bldgname = '${bldgname}' AND ${adjustedDateRange}`;
    }
  
    // user specifies "grab all buildings in this table"
    if (!campus) {
      spaceWhereClause += ' AND 1=1'
    }
    // default option if bldgname is included and is not a campus
    else {
      spaceWhereClause += ` AND campus = '${campus}'`;
    }
  
    const selectStatement = `
      SUM("present_elec_kwh") AS electricity, 
      SUM("present_htwt_mmbtuh") AS hot_water,
      SUM("present_wtr_usgal") AS water,
      SUM("present_chll_tonh") AS chilled_water,
      SUM("present_co2_tonh") AS co2_emissions,
      DATE_TRUNC('${datelevel}', ts) AS timestamp
    `
    const querySpace = `
      SELECT ${selectStatement}
      FROM ${table} 
      WHERE ${spaceWhereClause}
      GROUP BY timestamp
      ORDER BY timestamp ASC
    `
  
    try {
      data = {
        points: (await db.query(querySpace)).rows,
      };
  
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

module.exports = { spacePointsRouter };
