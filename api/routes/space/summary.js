const express = require("express");
const db = require("../../lib/db");
// import { checkCache, setCache } from '../../middleware/Cache';

const router = express.Router();

// get sum, average, and stddev from buildings 
function spaceSummaryRouter(cache, cacheTTL) {
  router.post("/", async (req, res) => {
    const { bldgname, startDate, endDate, datelevel, table, context } = req.body;
  
    let data = []
    const campus = context;
  
    if (!bldgname || !startDate || !endDate || !datelevel) {
      console.log('*** Missing Data (/summary) ***')
      return res.json({
        data,
        status: 'bad',
        message: 'missing data'
      });
    }
  
    // console.log(bldgname)
  
    const adjustedDateRange = `ts >= '${startDate}' AND ts <= '${endDate}'`
  
    let spaceWhereClause = ``;
    let campusWhereClause = ``;
    
  
    spaceWhereClause = `bldgname = '${bldgname}' AND ${adjustedDateRange}`;
    campusWhereClause = `bldgname != '${bldgname}' AND ${adjustedDateRange}`;
  
    // user specifies "grab all buildings in this table"
    if (!campus) {
      spaceWhereClause += ' AND 1=1'
    }
    // default option if bldgname is included and is not a campus
    else {
      spaceWhereClause += ` AND campus = '${campus}'`;
    }
  
    const commodities = ['present_elec_kwh', 'present_htwt_mmbtuh', 'present_wtr_usgal', 'present_chll_tonh', 'present_co2_tonh']
    const names = ['electricity', 'hot_water', 'water', 'chilled_water', 'co2_emissions']
  
    function spread(func) {
      return commodities.map((_, i) => {
        return `${func}("sum_${names[i]}") AS ${names[i]}`
    })}
  
    const selectStatement = `
      SUM("present_elec_kwh") AS sum_electricity, 
      SUM("present_htwt_mmbtuh") AS sum_hot_water,
      SUM("present_wtr_usgal") AS sum_water,
      SUM("present_chll_tonh") AS sum_chilled_water,
      SUM("present_co2_tonh") AS sum_co2_emissions,
      DATE_TRUNC('${datelevel}', ts) AS timestamp
    `
    const querySpace = `
      SELECT ${selectStatement}
      FROM ${table} 
      WHERE ${spaceWhereClause}
      GROUP BY timestamp
      ORDER BY timestamp ASC
    `
    const queryCampus = `
      SELECT ${selectStatement}
      FROM ${table} 
      WHERE ${campusWhereClause}
      GROUP BY timestamp
      ORDER BY timestamp ASC
    `
    const avgQuerySpace = `
      SELECT ${spread('AVG')}
      FROM (
        ${querySpace}
      ) AS T
    `
    const avgQueryCampus = `
      SELECT ${spread('AVG')}
      FROM (
        ${queryCampus}
      ) AS T
    `  
    const sumQuerySpace = `
      SELECT ${spread('SUM')}
      FROM (
        ${querySpace}
      ) AS T
    `
    const sumQueryCampus = `
      SELECT ${spread('SUM')}
      FROM (
        ${queryCampus}
      ) AS T
    `
    const stddevsQuerySpace = `
      SELECT ${spread('STDDEV')}
      FROM (
        ${querySpace}
      ) AS T
    `
    const stddevsQueryCampus = `
      SELECT ${spread('STDDEV')}
      FROM (
        ${queryCampus}
      ) AS T
    `
    try {
      data = {
        averages: {
          space: (await db.query(avgQuerySpace)).rows,
          campus: (await db.query(avgQueryCampus)).rows
        }, 
        sums: { 
          space: (await db.query(sumQuerySpace)).rows,
          campus: (await db.query(sumQueryCampus)).rows
        }, 
        stddevs: { 
          space: (await db.query(stddevsQuerySpace)).rows,
          campus: (await db.query(stddevsQueryCampus)).rows
        }
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

module.exports = { spaceSummaryRouter };