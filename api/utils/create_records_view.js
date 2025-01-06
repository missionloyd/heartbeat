const db = require("../lib/db");
const format = require("pg-format");
const {
  measurementTypeTranslations,
} = require("../constants/measurement_type_translations");

async function createRecordsView(parentAssetName, recordsViewAlias) {
  const measurementTypeQuery = `
        SELECT name AS type FROM measurement_type
    `;

  const commodotiesQueryResult = await db.query(measurementTypeQuery);

  const measurementTypeRows = commodotiesQueryResult.rows;

  // ---------------------------------------------------

  let caseStatements = "";
  for (let i = 0; i < measurementTypeRows.length; i++) {
    const measurementTypeName = measurementTypeRows[i]["type"];

    const caseString = `CASE WHEN type = '${measurementTypeName}' THEN sum END AS "${measurementTypeName}",`;

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
    measurement_type.name AS type,
    SUM(measurement.value)
    FROM measurement
    JOIN asset ON asset.id = measurement.asset_id
    JOIN measurement_type ON measurement_type.id = measurement.measurement_type_id
    WHERE
    asset.tree_id = (SELECT tree_id FROM asset WHERE name = %L)
    GROUP BY asset.name, measurement_type.name, timestamp
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
  for (let i = 0; i < measurementTypeRows.length; i++) {
    const measurementTypeName = measurementTypeRows[i]["type"];

    const sumString = `SUM("${measurementTypeName}") AS "${measurementTypeName}",`;

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

  for (let i = 0; i < measurementTypeRows.length; i++) {
    const measurementTypeName = measurementTypeRows[i]["type"];

    const measurement_type = measurementTypeTranslations[measurementTypeName];

    const finalColumnString = `"${measurementTypeName}" AS "${measurement_type}",`;

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