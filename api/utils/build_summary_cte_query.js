const {
  unpivotedMeasurementQueries,
} = require("../constants/unpivoted_measurement_queries");

function buildSummaryCteQuery(
  commodities,
  measurementQueryType,
  isHistoricalIncluded
) {
  const unpivotedMeasurementQuery =
    unpivotedMeasurementQueries[measurementQueryType];

  // ---------------------------------------------------

  let caseStatements = "";
  for (commodity of commodities) {
    const caseStatement = `CASE WHEN type = '${commodity}' THEN value END AS ${commodity},`;

    caseStatements += caseStatement;
  }

  // Remove the comma for the last column, before the 'FROM' SQL string; this is for proper SQL syntax:
  caseStatements = caseStatements.substring(0, caseStatements.length - 1);

  // ---------------------------------------------------

  const pivotedMeasurementQuery = `
          SELECT
          timestamp,
          ${caseStatements}
          FROM
          (
              ${unpivotedMeasurementQuery}
          )
          AS unpivoted_measurement
          GROUP BY
            timestamp
    `;

  // ------------------------------------------------------
  const present_alias = "present_pivoted_measurement_table";
  const historical_alias = "historical_pivoted_measurement_table";

  let commodityColumnPrefixes;
  let table_aliases;

  if (isHistoricalIncluded) {
    // Empty string is for the "present" columns:
    commodityColumnPrefixes = ["", "historical_"];
    table_aliases = [present_alias, historical_alias];
  } else {
    // Empty string is for the "present" columns:
    commodityColumnPrefixes = [""];
    table_aliases = [present_alias];
  }

  // ------------------------------------------------------
  const cteTableName = "t";
  let finalQuery;

  if (isHistoricalIncluded) {
    const aliases_and_prefixes = table_aliases.map((alias, i) => [
      alias,
      commodityColumnPrefixes[i],
    ]);

    let tableColumns = "";
    for (let alias_and_prefix of aliases_and_prefixes) {
      for (commodity of commodities) {
        const alias = alias_and_prefix[0];

        const prefix = alias_and_prefix[1];

        const tableColumnstring = `${alias}.${commodity} AS ${prefix}${commodity},`;

        tableColumns += tableColumnstring;
      }
    }

    // Remove the comma for the last column, before the 'FROM' SQL string; this is for proper SQL syntax:
    tableColumns = tableColumns.substring(0, tableColumns.length - 1);

    const addedHistoricalCteQuery = `
          SELECT
              ${present_alias}.timestamp AS truncated_timestamp,
              ${tableColumns}
          FROM
              ${present_alias}
          LEFT JOIN
              ${present_alias} AS ${historical_alias}
              ON
              ${historical_alias}.timestamp = ${present_alias}.timestamp - INTERVAL '1 YEAR'
    `;

    finalQuery = `
        WITH 
        ${present_alias} AS (
            ${pivotedMeasurementQuery}
        ),
        ${cteTableName} AS (
            ${addedHistoricalCteQuery}
        )
    `;
  } else {
    finalQuery = `
        WITH 
        ${cteTableName} AS (
            ${pivotedMeasurementQuery}
        )
    `;
  }

  return {
    cteTableName: cteTableName,
    cteQuery: finalQuery,
  };
}

module.exports = { buildSummaryCteQuery };
