const {
  measurementQueryTypes,
} = require("../constants/measurement_query_types");
const db = require("../lib/db");
const { buildMeasurementQuery } = require("../utils/build_measurement_query");

// Inputs :
//  - Name of Asset (STRING)
//  - isHistoricalIncluded (BOOLEAN)
// ~~~~~~~~~~~~~~~~
// Outputs (Measurement Data from the last 24 hours) :

async function getLatest(assetName, isHistoricalIncluded, isMeasurementPrediction) {
  // $1 : assetName
  // $2 : isMeasurementPrediction

  const commoditiesQuery = `
        SELECT type FROM commodity
    `;

  const commodotiesQueryResult = await db.query(commoditiesQuery);

  const commoditiesRows = commodotiesQueryResult.rows;

  const latestMeasurementQuery = buildMeasurementQuery(
    commoditiesRows,
    measurementQueryTypes.Latest.value,
    isHistoricalIncluded
  );

  const queryResult = await db.query(latestMeasurementQuery, [assetName, isMeasurementPrediction]);

  const latestData = queryResult.rows;

  return latestData;
}

module.exports = { getLatest };