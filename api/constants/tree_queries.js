const treeViewQuery = `
    WITH
        depth_table AS (
            SELECT
                (COUNT(parent.name) - 1) AS depth,
                child.lft AS lft,
                child.rght AS rght,
                child.id AS id,
                child.name AS name
            FROM
                asset AS child,
                asset AS parent
            WHERE
                child.lft BETWEEN parent.lft AND parent.rght
                AND
                parent.tree_id = (SELECT tree_id FROM asset WHERE id = %L)
                AND
                child.tree_id = parent.tree_id
            GROUP BY
                child.id,
                child.name
            ORDER BY
                depth
        ), tree_table AS (
            SELECT
                t1.depth AS parent_depth,
                t1.id AS parent_id,
                t1.name AS parent_name,
                t2.id AS child_id,
                t2.name AS child_name
            FROM
                depth_table AS t1,
                depth_table AS t2
            WHERE
                t1.lft >= (SELECT lft FROM asset WHERE id = %L)
                AND
                t1.rght <= (SELECT rght FROM asset WHERE id = %L)
                AND
                t2.lft > t1.lft
                AND
                t2.lft < t1.rght
                AND
                t2.depth = t1.depth + 1
                AND
                t1.depth >= (SELECT depth FROM depth_table WHERE id = %L)
            ORDER BY
                t1.depth
        )
    SELECT 
        * 
    FROM 
        tree_table
`;

const treeQuery = (viewAlias) => `
    SELECT
        ${viewAlias}.parent_id AS id,
        ${viewAlias}.parent_name AS name,
        ARRAY_AGG(
            JSON_BUILD_OBJECT(
                'id', ${viewAlias}.child_id,
                'name', ${viewAlias}.child_name,
                'children', generate_tree_json(${viewAlias}.child_id)
            )
        ) AS children
    FROM
        ${viewAlias}
    WHERE
        ${viewAlias}.parent_id = $1
    GROUP BY
        ${viewAlias}.parent_id,
        ${viewAlias}.parent_name
`;

module.exports = { treeViewQuery, treeQuery };