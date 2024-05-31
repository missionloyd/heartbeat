const db = require('../lib/db');

async function getAssets(parentAsset){
    // Get child assets of certain parent asset:
    const parentAssetQuery = `
        SELECT
        child.name AS name
        FROM
        asset AS child,
        asset AS parent
        WHERE child.lft BETWEEN parent.lft AND parent.rght
        AND parent.name = $1
        AND child.name != $1
        AND child.tree_id = parent.tree_id
        ORDER BY child.name
    `;

    const queryResult = await db.query(parentAssetQuery, [parentAsset]);

    const assets = queryResult.rows;

    return assets;
};

module.exports = { getAssets };