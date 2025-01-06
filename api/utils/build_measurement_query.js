const {
  measurementTypeTranslations,
} = require("../constants/measurement_type_translations");
const {
  buildHistoricalMeasurementTableQuery,
} = require("./build_historical_measurement_table_query");
const {
  buildPresentMeasurementTableQuery,
} = require("./build_present_measurement_table_query");

// Inputs :
//  - measurementTypeRows (ARRAY): array with all measurementTypes
//  - measurementQueryType (INTEGER)
//  - isHistoricalIncluded (BOOLEAN)
// ~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~
// Output (STRING) :
//  - an SQL query for the normalized measurement table.

function buildMeasurementQuery(
  measurementTypeRows,
  measurementQueryType,
  isHistoricalIncluded,
  aggregation,
) {
  const pivotedPresentMeasurementAlias = "pivoted_present_measurement_table";

  // -----------------------------------------------
  // Create the duplicate "historical" measurement table...
  // -----------------------------------------------

  let measurementTypeColumnPrefixes;
  let finalHistoricalMeasurementTableQuery;

  if (isHistoricalIncluded) {
    // Empty string is for the "present" columns:
    measurementTypeColumnPrefixes = ["", "historical_"];

    const historicalMeasurementTableQuery =
      buildHistoricalMeasurementTableQuery(
        measurementTypeRows,
        measurementQueryType,
        aggregation,
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
    measurementTypeColumnPrefixes = [""];
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
  for (let prefix of measurementTypeColumnPrefixes) {
    for (let i = 0; i < measurementTypeRows.length; i++) {
      const measurementTypeName = measurementTypeRows[i]["type"];

      const measurement_type = measurementTypeTranslations[measurementTypeName];

      const finalColumnString = `"${prefix}${measurementTypeName}" AS "${prefix}${measurement_type}",`;

      finalColumns += finalColumnString;
    }
  }

  // Remove the comma for the last column, before the 'FROM' SQL string; this is for proper SQL syntax:
  finalColumns = finalColumns.substring(0, finalColumns.length - 1);

  // ------------------------------------------------------

  const presentMeasurementTableQuery = buildPresentMeasurementTableQuery(
    measurementTypeRows,
    measurementQueryType,
    aggregation,
  );

  const finalPresentMeasurementTableQuery = `
    SELECT
    ${pivotedPresentMeasurementAlias}.id,
    ${pivotedPresentMeasurementAlias}.name,
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