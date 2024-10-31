const db = require("../lib/db");
const format = require("pg-format");
const {
  commodityTranslations,
} = require("../constants/commodity_translations");

async function createRecordsView(parentAssetName, recordsViewAlias) {
  const commoditiesQuery = `
        SELECT type FROM commodity
    `;

  const commodotiesQueryResult = await db.query(commoditiesQuery);

  const commoditiesRows = commodotiesQueryResult.rows;

  // ---------------------------------------------------

  let caseStatements = "";
  for (let i = 0; i < commoditiesRows.length; i++) {
    const commodityType = commoditiesRows[i]["type"];

    const caseString = `CASE WHEN type = '${commodityType}' THEN sum END AS "${commodityType}",`;

    caseStatements += caseString;
  }

  // Remove the comma for the last column; this is for proper SQL syntax:
  caseStatements = caseStatements.substring(0, caseStatements.length - 1);

  // ---------------------------------------------------

  const unpivotedRecordsTableQuery = format(
    `
    SELECT
    asset.name,
    DATE_TRUNC('HOUR', measurement.ts) as timestamp,
    commodity.type,
    SUM(measurement.value)
    FROM measurement
    JOIN asset ON asset.id = measurement.asset_id
    JOIN commodity ON commodity.id = measurement.commodity_id
    WHERE
    asset.tree_id = (SELECT tree_id FROM asset WHERE name = %L)
    GROUP BY asset.name, commodity.type, timestamp
  `,
    parentAssetName
  );

  const pivotedRecordsTableQuery = `
        SELECT
        name,
        timestamp,
        ${caseStatements}
        FROM
        (
            ${unpivotedRecordsTableQuery}
        )
        AS unpivoted_measurement
    `;

  // -----------------------------------------------

  let sumStatements = "";
  for (let i = 0; i < commoditiesRows.length; i++) {
    const commodityType = commoditiesRows[i]["type"];

    const sumString = `SUM("${commodityType}") AS "${commodityType}",`;

    sumStatements += sumString;
  }

  // Remove the comma for the last column; this is for proper SQL syntax:
  sumStatements = sumStatements.substring(0, sumStatements.length - 1);

  // ------------------------------------------------

  const recordsMeasurementTableQuery = `
        SELECT
        name,
        timestamp,
        ${sumStatements}
        FROM 
        (
            ${pivotedRecordsTableQuery}
        )
        AS pivoted_records_table
        GROUP BY name, timestamp
    `;

  // ------------------------------------------------------------------------

  let finalColumns = "";

  for (let i = 0; i < commoditiesRows.length; i++) {
    const commodityType = commoditiesRows[i]["type"];

    const commodity = commodityTranslations[commodityType];

    const finalColumnString = `"${commodityType}" AS "${commodity}",`;

    finalColumns += finalColumnString;
  }

  // Remove the comma for the last column, before the 'FROM' SQL string; this is for proper SQL syntax:
  finalColumns = finalColumns.substring(0, finalColumns.length - 1);

  // ------------------------------------------------------

  const finalRecordsMeasurementTableQuery = `
    SELECT
    name,
    timestamp,
    EXTRACT(YEAR FROM timestamp) AS year,
    EXTRACT(MONTH FROM timestamp) AS month,
    EXTRACT(DAY FROM timestamp) AS day,
    EXTRACT(HOUR FROM timestamp) AS hour,
    ${finalColumns}
    FROM 
    (
        ${recordsMeasurementTableQuery}
    )
    AS pivoted_records_measurement_table
    ORDER BY timestamp ASC
  `;

  const viewQuery = `
    CREATE OR REPLACE VIEW
    ${recordsViewAlias}
    AS
    ${finalRecordsMeasurementTableQuery}
  `;

  await db.query(viewQuery);
}

module.exports = { createRecordsView };