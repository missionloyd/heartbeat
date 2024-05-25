const {
  unpivotedPresentQueries,
} = require("../constants/unpivoted_present_queries");

function buildPresentMeasurementTableQuery(
  commoditiesRows,
  measurementQueryType
) {
  // ---------------------------------------------------

  let presentCaseStatements = "";
  for (let i = 0; i < commoditiesRows.length; i++) {
    const commodityType = commoditiesRows[i]["type"];

    const presentCaseString = `CASE WHEN type = '${commodityType}' THEN sum END AS ${commodityType},`;

    presentCaseStatements += presentCaseString;
  }

  // Remove the comma for the last column; this is for proper SQL syntax:
  presentCaseStatements = presentCaseStatements.substring(
    0,
    presentCaseStatements.length - 1
  );

  // ---------------------------------------------------

  const unpivotedPresentQuery = unpivotedPresentQueries[measurementQueryType];

  // let unpivotedPresentQuery;

  // if (isComplementQuery) {
  //   unpivotedPresentQuery = `
  //           SELECT
  //           DATE_TRUNC($1, measurement.ts) as timestamp,
  //           commodity.type,
  //           SUM(measurement.value) FROM measurement
  //           JOIN asset ON asset.id = measurement.asset_id
  //           JOIN commodity ON commodity.id = measurement.commodity_id
  //           WHERE asset.name != $2 AND
  //           asset.tree_id = (SELECT tree_id FROM asset WHERE name = $2) AND
  //           asset.lft != 1 AND
  //           measurement.ts >= $3 AND measurement.ts <= $4
  //           GROUP BY asset.name, commodity.type, timestamp
  //       `;
  // } else {
  //   unpivotedPresentQuery = `
  //           SELECT
  //           DATE_TRUNC($1, measurement.ts) as timestamp,
  //           commodity.type,
  //           SUM(measurement.value) FROM measurement
  //           JOIN asset ON asset.id = measurement.asset_id
  //           JOIN commodity ON commodity.id = measurement.commodity_id
  //           WHERE asset.name = $2 AND
  //           measurement.ts >= $3 AND measurement.ts <= $4
  //           GROUP BY asset.name, commodity.type, timestamp
  //       `;
  // }

  const pivotedPresentQuery = `
        SELECT
        timestamp,
        ${presentCaseStatements}
        FROM
        (
            ${unpivotedPresentQuery}
        )
        AS unpivoted_measurement
    `;

  // -----------------------------------------------

  let presentSumStatements = "";
  for (let i = 0; i < commoditiesRows.length; i++) {
    const commodityType = commoditiesRows[i]["type"];

    const presentSumString = `SUM(${commodityType}) AS ${commodityType},`;

    presentSumStatements += presentSumString;
  }

  // Remove the comma for the last column; this is for proper SQL syntax:
  presentSumStatements = presentSumStatements.substring(
    0,
    presentSumStatements.length - 1
  );

  // ------------------------------------------------

  const pivotedPresentAlias = "pivoted_present_measurement";

  const pivotedPresentTableQuery = `
        SELECT
        timestamp,
        ${presentSumStatements}
        FROM 
        (
            ${pivotedPresentQuery}
        )
        AS ${pivotedPresentAlias}
        GROUP BY timestamp
    `;

  return pivotedPresentTableQuery;
}

module.exports = { buildPresentMeasurementTableQuery };
