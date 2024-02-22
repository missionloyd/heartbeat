const express = require("express");
const db = require("../../lib/db");
// import { checkCache, setCache } from '../../middleware/Cache';

const router = express.Router();

// **************************************
// TODO (1)
// Table names cannot be parameterized...
// Find way to fix that or leave as is.
// **************************************

// get data points for a space (default in days)
function spacePointsRouter(cache, cacheTTL) {
  router.post("/", async (req, res) => {
    const { bldgname, startDate, endDate, datelevel, table, context } =
      req.body;

    let data = [];
    const campus = context;

    if (!startDate || !endDate || !datelevel) {
      console.log("*** Missing Data (/points) ***");
      return res.json({
        data,
        status: "bad",
        message: "missing data",
      });
    }

    let adjustedDateRange = "";
    let spaceWhereClause = ``;

    // parameters array for the paramterized queries;
    // Parameter $1 is always constant:
    //  $1 : datelevel
    let queryParameters = [datelevel];

    // user specifies "grab all buildings in this table"
    if (!bldgname) {
      // At this if block, we get:
      //  $2 : startDate
      //  $3 : endDate
      adjustedDateRange = "ts >= $2 AND ts <= $3";
      queryParameters.push(startDate, endDate);

      spaceWhereClause = adjustedDateRange;
    }
    // default option if bldgname is included and is not a campus
    else {
      // At this if block, we instead get:
      //  $2 : bldgname
      //  $3 : startDate
      //  $4 : endDate
      adjustedDateRange = "ts >= $3 AND ts <= $4";
      queryParameters.push(bldgname, startDate, endDate);

      spaceWhereClause = `bldgname = $2 AND ${adjustedDateRange}`;
    }

    // user specifies "grab all buildings in this table"
    if (!campus) {
      spaceWhereClause += " AND 1=1";
    }
    // default option if bldgname is included and is not a campus
    else {
      // Check how many parameters are in the array to decide if:
      //  (if !bldgname) was entered -> array holds 3 parameters -> campus should be $4
      //  (else) was entered -> array holds 4 parameters -> campus should be $5
      const campusNumber = queryParameters.length + 1;

      // example of result : AND campus = $4;
      spaceWhereClause += ` AND campus = \$${campusNumber}`;

      queryParameters.push(campus);
    }

    // $1 : "datelevel" variable
    const selectStatement = `
      SUM("present_elec_kwh") AS electricity, 
      SUM("present_htwt_mmbtuh") AS hot_water,
      SUM("present_wtr_usgal") AS water,
      SUM("present_chll_tonh") AS chilled_water,
      SUM("present_co2_tonh") AS co2_emissions,
      DATE_TRUNC($1, ts) AS timestamp
    `;
    const querySpace = `
      SELECT ${selectStatement}
      FROM ${table} 
      WHERE ${spaceWhereClause}
      GROUP BY timestamp
      ORDER BY timestamp ASC
    `;

    try {
      data = {
        points: (await db.query(querySpace, queryParameters)).rows,
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

module.exports = { spacePointsRouter };
