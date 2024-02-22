const express = require("express");
const db = require("../../lib/db");
// import { checkCache, setCache } from '../../middleware/Cache';

const router = express.Router();

// **************************************
// TODO (1)
// Table names cannot be parameterized...
// Find way to fix that or leave as is.
// **************************************

// get sum, average, and stddev from buildings
function spaceSummaryRouter(cache, cacheTTL) {
  router.post("/", async (req, res) => {
    const { bldgname, startDate, endDate, datelevel, table, context } =
      req.body;

    let data = [];
    const campus = context;

    if (!bldgname || !startDate || !endDate || !datelevel) {
      console.log("*** Missing Data (/summary) ***");
      return res.json({
        data,
        status: "bad",
        message: "missing data",
      });
    }

    // parameters array for the paramterized queries;
    // Parameters $1, $2, $3, $4 are always constant:
    //  $1 : datelevel
    //  $2 : bldgname
    //  $3 : startDate
    //  $4 : endDate

    // Create 2 different arrays as both can be different depending on the scenario:
    let spaceQueryParameters = [datelevel, bldgname, startDate, endDate];
    let campusQueryParameters = [datelevel, bldgname, startDate, endDate];

    const adjustedDateRange = `ts >= $3 AND ts <= $4`;
    let spaceWhereClause = `bldgname = $2 AND ${adjustedDateRange}`;
    let campusWhereClause = `bldgname != $2 AND ${adjustedDateRange}`;

    // user specifies "grab all buildings in this table"
    if (!campus) {
      spaceWhereClause += " AND 1=1";
    }
    // default option if bldgname is included and is not a campus
    else {
      // If this block is entered, push the "campus" variable as a space query parameter.
      // It'll always be $5 (for now).
      spaceQueryParameters.push(campus);

      spaceWhereClause += " AND campus = $5";
    }

    const commodities = [
      "present_elec_kwh",
      "present_htwt_mmbtuh",
      "present_wtr_usgal",
      "present_chll_tonh",
      "present_co2_tonh",
    ];
    const names = [
      "electricity",
      "hot_water",
      "water",
      "chilled_water",
      "co2_emissions",
    ];

    function spread(func) {
      return commodities.map((_, i) => {
        return `${func}("sum_${names[i]}") AS ${names[i]}`;
      });
    }

    // $1 : "datelevel" variable
    const selectStatement = `
      SUM("present_elec_kwh") AS sum_electricity, 
      SUM("present_htwt_mmbtuh") AS sum_hot_water,
      SUM("present_wtr_usgal") AS sum_water,
      SUM("present_chll_tonh") AS sum_chilled_water,
      SUM("present_co2_tonh") AS sum_co2_emissions,
      DATE_TRUNC($1, ts) AS timestamp
    `;
    const querySpace = `
      SELECT ${selectStatement}
      FROM ${table} 
      WHERE ${spaceWhereClause}
      GROUP BY timestamp
      ORDER BY timestamp ASC
    `;
    const queryCampus = `
      SELECT ${selectStatement}
      FROM ${table} 
      WHERE ${campusWhereClause}
      GROUP BY timestamp
      ORDER BY timestamp ASC
    `;
    const avgQuerySpace = `
      SELECT ${spread("AVG")}
      FROM (
        ${querySpace}
      ) AS T
    `;
    const avgQueryCampus = `
      SELECT ${spread("AVG")}
      FROM (
        ${queryCampus}
      ) AS T
    `;
    const sumQuerySpace = `
      SELECT ${spread("SUM")}
      FROM (
        ${querySpace}
      ) AS T
    `;
    const sumQueryCampus = `
      SELECT ${spread("SUM")}
      FROM (
        ${queryCampus}
      ) AS T
    `;
    const stddevsQuerySpace = `
      SELECT ${spread("STDDEV")}
      FROM (
        ${querySpace}
      ) AS T
    `;
    const stddevsQueryCampus = `
      SELECT ${spread("STDDEV")}
      FROM (
        ${queryCampus}
      ) AS T
    `;

    // debugging purposes
    console.log("******************************");
    console.log(queryCampus);
    console.log("******************************");
    console.log(campusQueryParameters);
    console.log("******************************");
    console.log("<><><><><><><><><><><><><><><>");
    console.log("******************************");
    console.log(querySpace);
    console.log("******************************");
    console.log(spaceQueryParameters);
    console.log("******************************");

    try {
      data = {
        averages: {
          space: (await db.query(avgQuerySpace, spaceQueryParameters)).rows,
          campus: (await db.query(avgQueryCampus, campusQueryParameters)).rows,
        },
        sums: {
          space: (await db.query(sumQuerySpace, spaceQueryParameters)).rows,
          campus: (await db.query(sumQueryCampus, campusQueryParameters)).rows,
        },
        stddevs: {
          space: (await db.query(stddevsQuerySpace, spaceQueryParameters)).rows,
          campus: (await db.query(stddevsQueryCampus, campusQueryParameters))
            .rows,
        },
      };
    } catch (error) {
      console.log(error);
      return res.json({
        data: [],
        status: 500,
        message: error,
      });
    }

    return res.json({
      data,
      status: "ok",
    });
  });

  return router;
}

module.exports = { spaceSummaryRouter };
