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

    const historicalCaseString = `CASE WHEN type = '${commodityType}' THEN sum END AS historical_${commodityType},`;

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

  // let unpivotedHistoricalQuery;

  // if (isComplementQuery) {
  //   unpivotedHistoricalQuery = `
  //             SELECT
  //             DATE_TRUNC($1, measurement.ts) as timestamp,
  //             commodity.type,
  //             SUM(measurement.value) FROM measurement
  //             JOIN asset ON asset.id = measurement.asset_id
  //             JOIN commodity ON commodity.id = measurement.commodity_id
  //             WHERE asset.name != $2 AND
  //             asset.tree_id = (SELECT tree_id FROM asset WHERE name = $2) AND
  //             asset.lft != 1
  //             GROUP BY asset.name, commodity.type, timestamp
  //         `;
  // } else {
  //   unpivotedHistoricalQuery = `
  //             SELECT
  //             DATE_TRUNC($1, measurement.ts) as timestamp,
  //             commodity.type,
  //             SUM(measurement.value) FROM measurement
  //             JOIN asset ON asset.id = measurement.asset_id
  //             JOIN commodity ON commodity.id = measurement.commodity_id
  //             WHERE asset.name = $2
  //             GROUP BY asset.name, commodity.type, timestamp
  //         `;
  // }

  const pivotedHistoricalQuery = `
        SELECT
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

    const historicalSumString = `SUM(historical_${commodityType}) AS historical_${commodityType},`;

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
        timestamp,
        ${historicalSumStatements}
        FROM 
        (
            ${pivotedHistoricalQuery}
        )
        AS ${pivotedHistoricalAlias}
        GROUP BY timestamp
    `;

  return pivotedHistoricalTableQuery;
}

module.exports = { buildHistoricalMeasurementTableQuery };
