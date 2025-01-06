const {
  unpivotedHistoricalQueries,
} = require("../constants/unpivoted_historical_queries");

function buildHistoricalMeasurementTableQuery(
  measurementTypeRows,
  measurementQueryType,
  aggregation
) {
  // ---------------------------------------------------

  let historicalCaseStatements = "";
  for (let i = 0; i < measurementTypeRows.length; i++) {
    const measurementTypeName = measurementTypeRows[i]["type"];

    const historicalCaseString = `CASE WHEN type = '${measurementTypeName}' THEN sum END AS "historical_${measurementTypeName}",`;

    historicalCaseStatements += historicalCaseString;
  }

  // Remove the comma for the last column; this is for proper SQL syntax:
  historicalCaseStatements = historicalCaseStatements.substring(
    0,
    historicalCaseStatements.length - 1
  );

  // ---------------------------------------------------

  const unpivotedHistoricalQuery =
    unpivotedHistoricalQueries[measurementQueryType];

  const pivotedHistoricalQuery = `
        SELECT
        id,
        name,
        timestamp,
        ${historicalCaseStatements}
        FROM 
        (
            ${unpivotedHistoricalQuery}
        )
        AS unpivoted_measurement
    `;

  // ------------------------------------

  let historicalSumStatements = "";
  for (let i = 0; i < measurementTypeRows.length; i++) {
    const measurementTypeName = measurementTypeRows[i]["type"];

    const historicalSumString = `${aggregation}("historical_${measurementTypeName}") AS "historical_${measurementTypeName}",`;

    historicalSumStatements += historicalSumString;
  }

  // Remove the comma for the last column; this is for proper SQL syntax:
  historicalSumStatements = historicalSumStatements.substring(
    0,
    historicalSumStatements.length - 1
  );

  // ------------------------------------

  const pivotedHistoricalAlias = "pivoted_historical_measurement";

  const pivotedHistoricalTableQuery = `
        SELECT
        id,
        name,
        timestamp,
        ${historicalSumStatements}
        FROM 
        (
            ${pivotedHistoricalQuery}
        )
        AS ${pivotedHistoricalAlias}
        GROUP BY
          id,
          name, 
          timestamp
    `;

  return pivotedHistoricalTableQuery;
}

module.exports = { buildHistoricalMeasurementTableQuery };
