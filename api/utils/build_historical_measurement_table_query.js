const {
  unpivotedHistoricalQueries,
} = require("../constants/unpivoted_historical_queries");

function buildHistoricalMeasurementTableQuery(
  commoditiesRows,
  measurementQueryType
) {
  // ---------------------------------------------------

  let historicalCaseStatements = "";
  for (let i = 0; i < commoditiesRows.length; i++) {
    const commodityType = commoditiesRows[i]["type"];

    const historicalCaseString = `CASE WHEN type = '${commodityType}' THEN sum END AS "historical_${commodityType}",`;

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
  for (let i = 0; i < commoditiesRows.length; i++) {
    const commodityType = commoditiesRows[i]["type"];

    const historicalSumString = `SUM("historical_${commodityType}") AS "historical_${commodityType}",`;

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
