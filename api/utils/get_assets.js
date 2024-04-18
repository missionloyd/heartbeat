const db = require('../lib/db');

async function getAssets(parentAsset){

    let assets;

    if(parentAsset) {
        // Get child assets of certain parent asset:
        const parentAssetQuery = `
            SELECT
            child.id AS id,
            child.name AS name,
            child.lft AS lft,
            child.rght AS rght
            FROM
            asset AS child,
            asset AS parent
            WHERE child.lft BETWEEN parent.lft AND parent.rght
            AND parent.name = $1
            AND child.name != $1
            AND child.tree_id = parent.tree_id
            ORDER BY child.name
        `;

        const queryResult = await pool.query(parentAssetQuery, [parentAsset]);

        assets = queryResult.rows;

    } else {
        // Get all assets:
        const allAssetsQuery = "SELECT * FROM asset";
        const queryResult = await db.query(allAssetsQuery);
        assets = queryResult.rows;
    }

    return assets;
};

module.exports = { getAssets };