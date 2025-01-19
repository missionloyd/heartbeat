const {
  measurementTypeTranslations,
} = require("../constants/measurement_type_translations");
const db = require("../lib/db");
const { buildMeasurementQuery } = require("../utils/build_measurement_query");

// Inputs :
//  - Name of Asset (STRING)
//  - Starting Date (STRING)
//  - Ending Date (STRING)
//  - Date Level (STRING) such as hour, day, month
//  - sqlAggregateFunction (STRING) such as "sum", "avg", "stddev"
//  - measurementQueryType (ENUM VALUE)
//  - isHistoricalIncluded (BOOLEAN)
//  - measurementPredictionTypeId (INTEGER)
// ~~~~~~~~~~~~~~~~
// Outputs (Table Columns) :
//  - Aggregate, of some input SQL aggregate function, of all measurement_type name columns.

async function getSummary(
  assetName,
  startDate,
  endDate,
  dateLevel,
  sqlAggregateFunction,
  measurementQueryType,
  isHistoricalIncluded,
  measurementPredictionTypeId,
  aggregation
) {
  // $1 : dateLevel
  // $2 : assetName
  // $3 : startDate
  // $4 : endDate
  // $5 : measurementPredictionTypeId

  const measurementTypeQuery = `
      SELECT name AS type FROM measurement_type;
    `;

  const commodotiesQueryResult = await db.query(measurementTypeQuery);

  const measurementTypeRows = commodotiesQueryResult.rows;

  const measurementQuery = buildMeasurementQuery(
    measurementTypeRows,
    measurementQueryType,
    isHistoricalIncluded,
    aggregation
  );

  // ------------------------------------------------------
  let measurementTypeColumnPrefixes;
  if (isHistoricalIncluded) {
    measurementTypeColumnPrefixes = ["", "historical_"];
  } else {
    measurementTypeColumnPrefixes = [""];
  }

  let aggregateColumns = "";
  for (let prefix of measurementTypeColumnPrefixes) {
    for (let i = 0; i < measurementTypeRows.length; i++) {
      const measurementTypeName = measurementTypeRows[i]["type"];

      const measurement_type = measurementTypeTranslations[measurementTypeName];

      const aggregateColumnString = `${sqlAggregateFunction}("${prefix}${measurement_type}") AS "${prefix}${measurement_type}",`;

      aggregateColumns += aggregateColumnString;
    }
  }

  // Remove the comma for the last column; this is for proper SQL syntax:
  aggregateColumns = aggregateColumns.substring(0, aggregateColumns.length - 1);

  // ------------------------------------------------------

  const aggregateSummaryQuery = `
        SELECT
        ${aggregateColumns}
        FROM
        (
            ${measurementQuery}
        )
        AS pivoted_aggregate_measurement_table
    `;

  const queryResult = await db.query(aggregateSummaryQuery, [
    dateLevel,
    assetName,
    startDate,
    endDate,
    measurementPredictionTypeId
  ]);

  const summary = queryResult.rows;

  return summary;
}

module.exports = { getSummary };
