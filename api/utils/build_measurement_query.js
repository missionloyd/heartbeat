const {
  commodityTranslations,
} = require("../constants/commodity_translations");
const {
  buildHistoricalMeasurementTableQuery,
} = require("./build_historical_measurement_table_query");
const {
  buildPresentMeasurementTableQuery,
} = require("./build_present_measurement_table_query");

// Inputs :
//  - commodityRows (ARRAY): array with all commodities
//  - measurementQueryType (INTEGER)
//  - isHistoricalIncluded (BOOLEAN)
// ~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~
// Output (STRING) :
//  - an SQL query for the normalized measurement table.

function buildMeasurementQuery(
  commoditiesRows,
  measurementQueryType,
  isHistoricalIncluded
) {
  const pivotedPresentMeasurementAlias = "pivoted_present_measurement_table";

  // -----------------------------------------------
  // Create the duplicate "historical" measurement table...
  // -----------------------------------------------

  let commodityColumnPrefixes;
  let finalHistoricalMeasurementTableQuery;

  if (isHistoricalIncluded) {
    // Empty string is for the "present" columns:
    commodityColumnPrefixes = ["", "historical_"];

    const historicalMeasurementTableQuery =
      buildHistoricalMeasurementTableQuery(
        commoditiesRows,
        measurementQueryType
      );

    const pivotedPresentHistoricalAlias =
      "pivoted_historical_measurement_table";

    finalHistoricalMeasurementTableQuery = `
      LEFT JOIN
      (
          ${historicalMeasurementTableQuery}
      )
      AS ${pivotedPresentHistoricalAlias}
      ON ${pivotedPresentHistoricalAlias}.timestamp = ${pivotedPresentMeasurementAlias}.timestamp - INTERVAL '1 YEAR'
  `;
  } else {
    commodityColumnPrefixes = [""];
    finalHistoricalMeasurementTableQuery = "";
  }

  // -----------------------------------------------
  // Ending the historical measurement table...
  // -----------------------------------------------

  // -----------------------------------------------
  // Create the present measurement table...
  // -----------------------------------------------

  // ------------------------------------------------------

  let finalColumns = "";
  for (let prefix of commodityColumnPrefixes) {
    for (let i = 0; i < commoditiesRows.length; i++) {
      const commodityType = commoditiesRows[i]["type"];

      const commodity = commodityTranslations[commodityType];

      const finalColumnString = `${prefix}${commodityType} AS ${prefix}${commodity},`;

      finalColumns += finalColumnString;
    }
  }

  // Remove the comma for the last column, before the 'FROM' SQL string; this is for proper SQL syntax:
  finalColumns = finalColumns.substring(0, finalColumns.length - 1);

  // ------------------------------------------------------

  const presentMeasurementTableQuery = buildPresentMeasurementTableQuery(
    commoditiesRows,
    measurementQueryType
  );

  const finalPresentMeasurementTableQuery = `
    SELECT
    ${pivotedPresentMeasurementAlias}.timestamp,
    ${finalColumns}
    FROM 
    (
        ${presentMeasurementTableQuery}
    )
    AS ${pivotedPresentMeasurementAlias}
  `;

  // -----------------------------------------------
  // Ending the present measurement table...
  // -----------------------------------------------

  // -----------------------------------------------
  // Joining both measurement tables...
  // -----------------------------------------------

  const finalMeasurementTableQuery = `
        ${finalPresentMeasurementTableQuery}
        ${finalHistoricalMeasurementTableQuery}
        ORDER BY ${pivotedPresentMeasurementAlias}.timestamp ASC
    `;

  // -----------------------------------------------
  // Ending the joining of both measurement tables...
  // -----------------------------------------------

  return finalMeasurementTableQuery;
}

module.exports = { buildMeasurementQuery };