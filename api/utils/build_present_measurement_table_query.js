const {
  unpivotedPresentQueries,
} = require("../constants/unpivoted_present_queries");

function buildPresentMeasurementTableQuery(
  measurementTypeRows,
  measurementQueryType,
  aggregation,
) {
  // ---------------------------------------------------

  let presentCaseStatements = "";
  for (let i = 0; i < measurementTypeRows.length; i++) {
    const measurementTypeName = measurementTypeRows[i]["type"];

    const presentCaseString = `CASE WHEN type = '${measurementTypeName}' THEN ${aggregation} END AS "${measurementTypeName}",`;

    presentCaseStatements += presentCaseString;
  }

  // Remove the comma for the last column; this is for proper SQL syntax:
  presentCaseStatements = presentCaseStatements.substring(
    0,
    presentCaseStatements.length - 1
  );

  // ---------------------------------------------------

  const unpivotedPresentQuery = unpivotedPresentQueries[measurementQueryType](aggregation);

  const pivotedPresentQuery = `
        SELECT
        id, 
        name,
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
  for (let i = 0; i < measurementTypeRows.length; i++) {
    const measurementTypeName = measurementTypeRows[i]["type"];
    const presentSumString = `${aggregation}("${measurementTypeName}") AS "${measurementTypeName}",`;

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
        id, 
        name,
        timestamp,
        ${presentSumStatements}
        FROM 
        (
            ${pivotedPresentQuery}
        )
        AS ${pivotedPresentAlias}
        GROUP BY 
          id,
          name,  
          timestamp
    `;

  return pivotedPresentTableQuery;
}

module.exports = { buildPresentMeasurementTableQuery };
