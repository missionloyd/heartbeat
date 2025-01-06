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

async function getLatest(assetName, isHistoricalIncluded, isMeasurementPrediction, aggregation) {
  // $1 : assetName
  // $2 : isMeasurementPrediction

  const measurementTypeQuery = `
        SELECT name AS type FROM measurement_type
    `;

  const commodotiesQueryResult = await db.query(measurementTypeQuery);

  const measurementTypeRows = commodotiesQueryResult.rows;

  const latestMeasurementQuery = buildMeasurementQuery(
    measurementTypeRows,
    measurementQueryTypes.Latest.value,
    isHistoricalIncluded,
    aggregation
  );

  const queryResult = await db.query(latestMeasurementQuery, [assetName, isMeasurementPrediction]);

  const latestData = queryResult.rows;

  return latestData;
}

module.exports = { getLatest };