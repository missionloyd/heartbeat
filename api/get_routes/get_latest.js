const {
  measurementQueryTypes,
} = require("../constants/measurement_query_types");
const db = require("../lib/db");
const { buildMeasurementQuery } = require("../utils/build_measurement_query");

// Inputs :
//  - Name of Asset (STRING)
// ~~~~~~~~~~~~~~~~
// Outputs (Measurement Data from the last 24 hours) :

async function getLatest(assetName) {
  // $1 : assetName

  const commoditiesQuery = `
        SELECT type FROM commodity
    `;

  const commodotiesQueryResult = await db.query(commoditiesQuery);

  const commoditiesRows = commodotiesQueryResult.rows;

  const includeHistoricalColumns = true;

  const latestMeasurementQuery = buildMeasurementQuery(
    commoditiesRows,
    measurementQueryTypes.Latest.value,
    includeHistoricalColumns
  );

  const queryResult = await db.query(latestMeasurementQuery, [assetName]);

  const latestData = queryResult.rows;

  return latestData;
}

module.exports = { getLatest };