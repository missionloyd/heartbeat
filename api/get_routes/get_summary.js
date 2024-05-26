const {
  commodityTranslations,
} = require("../constants/commodity_translations");
const db = require("../lib/db");
const { buildMeasurementQuery } = require("../utils/build_measurement_query");

// Inputs :
//  - Name of Asset (STRING)
//  - Starting Date (STRING)
//  - Ending Date (STRING)
//  - Date Level (STRING) such as hour, day, month
//  - sqlAggregateFunction (STRING) such as "sum", "avg", "stddev"
//  - isAssetComplementary (BOOLEAN): get measurements for the asset (FALSE) OR
//    get all other assets in same tree and on same depth, except for the asset passed in as input;
//    this is needed for the summary API route which compares the asset measurements with other assets in same tree and depth.
// ~~~~~~~~~~~~~~~~
// Outputs (Table Columns) :
//  - Aggregate, of some input SQL aggregate function, of all commodity type columns.

async function getSummary(
  assetName,
  startDate,
  endDate,
  dateLevel,
  sqlAggregateFunction,
  measurementQueryType
) {
  // $1 : dateLevel
  // $2 : assetName
  // $3 : startDate
  // $4 : endDate

  const commoditiesQuery = `
        SELECT type FROM commodity
    `;

  const commodotiesQueryResult = await db.query(commoditiesQuery);

  const commoditiesRows = commodotiesQueryResult.rows;

  const includeHistoricalColumns = false;

  const measurementQuery = buildMeasurementQuery(
    commoditiesRows,
    measurementQueryType,
    includeHistoricalColumns
  );

  // ------------------------------------------------------
  let commodityColumnPrefixes;
  if (includeHistoricalColumns) {
    commodityColumnPrefixes = ["", "historical_"];
  } else {
    commodityColumnPrefixes = [""];
  }

  let aggregateColumns = "";
  for (let prefix of commodityColumnPrefixes) {
    for (let i = 0; i < commoditiesRows.length; i++) {
      const commodityType = commoditiesRows[i]["type"];

      const commodity = commodityTranslations[commodityType];

      const aggregateColumnString = `${sqlAggregateFunction}(${prefix}${commodity}) AS ${prefix}${commodity},`;

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
  ]);

  const summary = queryResult.rows;

  return summary;
}

module.exports = { getSummary };
