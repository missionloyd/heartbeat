const {
  commodityTranslations,
} = require("../constants/commodity_translations");
const {
  unpivotedMeasurementQueries,
} = require("../constants/unpivoted_measurement_queries");

function buildPointsCteQuery(
  commodities,
  measurementQueryType,
  isHistoricalIncluded
) {
  const timeSeriesTableQuery = `
        SELECT
            *
        FROM
            generate_series (
                DATE_TRUNC('HOUR', $1::TIMESTAMP),
                DATE_TRUNC('HOUR', $2::TIMESTAMP),
                '1 HOUR'::INTERVAL
            ) AS timestamp
    `;

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
    `;

  // -----------------------------------------------

  let commodityColumnPrefixes;
  let table_aliases;
  let joinStatements;

  const present_alias = "present_pivoted_measurement_table";
  const historical_alias = "historical_pivoted_measurement_table";

  if (isHistoricalIncluded) {
    // Empty string is for the "present" columns:
    commodityColumnPrefixes = ["", "historical_"];
    table_aliases = [present_alias, historical_alias];

    joinStatements = `
        LEFT JOIN
            pivoted_measurement_table AS ${present_alias} 
            ON 
            ${present_alias}.timestamp = time_series_table.timestamp
        LEFT JOIN
            pivoted_measurement_table AS ${historical_alias} 
            ON
            ${historical_alias}.timestamp = time_series_table.timestamp - INTERVAL '1 YEAR'
    `;
  } else {
    // Empty string is for the "present" columns:
    commodityColumnPrefixes = [""];
    table_aliases = [present_alias];

    joinStatements = `
        LEFT JOIN
            pivoted_measurement_table AS ${present_alias} 
            ON 
            ${present_alias}.timestamp = time_series_table.timestamp
    `;
  }

  // ------------------------------------------------------

  const aliases_and_prefixes = table_aliases.map((alias, i) => [
    alias,
    commodityColumnPrefixes[i],
  ]);

  // // ------------------------------------------------------

  let measurementTableColumns = "";
  for (let alias_and_prefix of aliases_and_prefixes) {
    for (commodity of commodities) {
      const commodityName = commodityTranslations[commodity];

      const alias = alias_and_prefix[0];

      const prefix = alias_and_prefix[1];

      const measurementTableColumnString = `SUM(${alias}.${commodity}) AS ${prefix}${commodityName},`;

      measurementTableColumns += measurementTableColumnString;
    }
  }

  // Remove the comma for the last column, before the 'FROM' SQL string; this is for proper SQL syntax:
  measurementTableColumns = measurementTableColumns.substring(
    0,
    measurementTableColumns.length - 1
  );

  // ------------------------------------------------------

  const measurementTableQuery = `
    SELECT
        DATE_TRUNC($6, time_series_table.timestamp) AS truncated_timestamp,
        ${measurementTableColumns}
    FROM
        time_series_table
        ${joinStatements}
    GROUP BY
        truncated_timestamp
    ORDER BY
        truncated_timestamp
    ASC
  `;

  // ------------------------------------------------------
  const cteTableName = "t";

  const finalQuery = `
      WITH 
      time_series_table AS (
          ${timeSeriesTableQuery}
      ),
      pivoted_measurement_table AS (
          ${pivotedMeasurementQuery}
      ),
      ${cteTableName} AS (
          ${measurementTableQuery}
      )
  `;

  return {
    cteTableName: cteTableName,
    cteQuery: finalQuery,
  };
}

module.exports = { buildPointsCteQuery };
