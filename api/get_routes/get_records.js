const { formatQuery } = require("react-querybuilder");
const { processSQL } = require("../utils/processSQL");
const db = require("../lib/db");

// Currently doesnt work, but it seems as though it requires some front-end component.
// Replace with commented out lines to allow it to work without the "formatQuery" function.

async function getRecords(userQuery, recordsViewAlias) {
  const { sql, params } = formatQuery(userQuery, {
    format: "parameterized",
  });

  const whereClause = processSQL(sql);

  // const whereClause = userQuery;

  const recordsQuery = `
    SELECT
    *
    FROM
    ${recordsViewAlias}
    WHERE
    ${whereClause}
  `;

  const queryResult = await db.query(recordsQuery, params);
  // const queryResult = await pool.query(recordsQuery);

  const records = queryResult.rows;

  return records;
}

module.exports = { getRecords };
