const db = require("../lib/db");
const format = require("pg-format");
const {
  commodityTranslations,
} = require("../constants/commodity_translations");
const {
  unpivotedMeasurementQueries,
} = require("../constants/unpivoted_measurement_queries");

async function createRecordsView(
  parentAssetName,
  recordsViewAlias,
  measurementQueryType
) {
  const commoditiesQuery = "SELECT type FROM commodity";

  const commodotiesQueryResult = await pool.query(commoditiesQuery);

  const commoditiesRows = commodotiesQueryResult.rows;

  // ---------------------------------------------------

  let caseStatements = "";
  for (let i = 0; i < commoditiesRows.length; i++) {
    const commodityType = commoditiesRows[i]["type"];
    const commodity = commodityTranslations[commodityType];

    const caseString = `CASE WHEN type = '${commodityType}' THEN value END AS ${commodity},`;

    caseStatements += caseString;
  }

  // Remove the comma for the last column; this is for proper SQL syntax:
  caseStatements = caseStatements.substring(0, caseStatements.length - 1);

  // ---------------------------------------------------

  const unpivotedMeasurementQuery =
    unpivotedMeasurementQueries[measurementQueryType];

  const pivotedRecordsTableQuery = format(
    unpivotedMeasurementQuery(caseStatements),
    parentAssetName
  );

  // ---------------------------------------------------

  const viewQuery = `
    CREATE OR REPLACE VIEW
    ${recordsViewAlias}
    AS
    ${pivotedRecordsTableQuery}
  `;

  await db.query(viewQuery);
}

module.exports = { createRecordsView };