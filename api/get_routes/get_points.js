const {
  measurementQueryTypes,
} = require("../constants/measurement_query_types");
const db = require("../lib/db");
const { buildMeasurementQuery } = require("../utils/build_measurement_query");

// Inputs :
//  - Name of Asset (STRING)
//  - Starting Date (STRING)
//  - Ending Date (STRING)
//  - Date Level (STRING) such as hour, day, month
//  - isHistoricalIncluded (BOOLEAN)
// ~~~~~~~~~~~~~~~~
// Outputs (Table Columns) :
//  - timestamp (of specified datelevel) of when measurement of measurement_type was taken.
//  - name of measurement_type
//  - sum of measurement_type measurement during that timestamp datelevel.

async function getPoints(assetName, startDate, endDate, dateLevel, aggregation, isHistoricalIncluded, isMeasurementPrediction) {
  // $1 : dateLevel
  // $2 : assetName
  // $3 : startDate
  // $4 : endDate
  // $5 : isMeasurementPrediction

  const measurementTypeQuery = `
        SELECT name AS type FROM measurement_type
    `;

  const commodotiesQueryResult = await db.query(measurementTypeQuery);

  const measurementTypeRows = commodotiesQueryResult.rows;

  const measurementQuery = buildMeasurementQuery(
    measurementTypeRows,
    measurementQueryTypes.Asset.value,
    isHistoricalIncluded,
    aggregation,
  );

  const queryResult = await db.query(measurementQuery, [
    dateLevel,
    assetName,
    startDate,
    endDate,
    isMeasurementPrediction,
  ]);

  const points = queryResult.rows;

  return points;
}

module.exports = { getPoints };
