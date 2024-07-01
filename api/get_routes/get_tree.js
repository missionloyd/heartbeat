const db = require("../lib/db");
const { treeViewQuery, treeQuery } = require("../constants/tree_queries");
const format = require("pg-format");

async function getTree(parentId) {
  // TODO :
  //    - dynamically pass in the view alias in the function call?
  //    - create the function on a route call with the view name?
  // **IMPORTANT** this view alias should be the same as the one used in the "generate_tree_json" function.
  const viewAlias = "tree_view";

  const createTreeViewQuery = `CREATE OR REPLACE VIEW ${viewAlias} AS ${treeViewQuery}`;

  const formattedCreateTreeViewQuery = format(
    createTreeViewQuery,
    parentId,
    parentId,
    parentId,
    parentId
  );

  await db.query(formattedCreateTreeViewQuery);

  // --------------------------------------------------------

  const tableQuery = await db.query("SELECT * FROM tree_view");

  const tableCount = tableQuery.rows.length;

  // tableCount is 0 when the parentId corresponds to a leaf asset which has no children.
  let query;
  if (tableCount == 0) {
    query = `
        SELECT
            id,
            name,
            ARRAY[]::JSON[] AS children
        FROM
            asset
        WHERE
            id = $1
    `;
  } else {
    query = treeQuery(viewAlias);
  }

  const treeQueryResult = await db.query(query, [parentId]);

  // TODO : Could this return more than one row?
  const tree = treeQueryResult.rows[0];

  return tree;
}

module.exports = { getTree };