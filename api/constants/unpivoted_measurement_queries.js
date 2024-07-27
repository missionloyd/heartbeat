const points = `
    SELECT
      asset.id,
      asset.name,
      DATE_TRUNC('HOUR', measurement.ts) as timestamp,
      commodity.type,
      measurement.value
    FROM 
      measurement
    JOIN 
      asset ON asset.id = measurement.asset_id
    JOIN 
      commodity ON commodity.id = measurement.commodity_id
    WHERE
      (
        asset.name = $3
        OR
        $3 = '%'
      )
      AND
      (
        commodity.type = $4 
        OR 
        $4 = '%'
      )
      AND
      measurement.is_prediction = $5
`;

// *****************************************************
// *****************************************************

const summary = `
    SELECT
      DATE_TRUNC($1, measurement.ts) as timestamp,
      commodity.type,
      measurement.value
    FROM 
      measurement
    JOIN 
      asset ON asset.id = measurement.asset_id
    JOIN 
      commodity ON commodity.id = measurement.commodity_id
    WHERE 
      asset.name = $2
      AND
      (
        commodity.type = $3
        OR
        $3 = '%' 
      )
      AND
      measurement.ts >= $4
      AND
      measurement.ts <= $5
      AND
      measurement.is_prediction = $6
`;

const assetTableWithDepth = `
  SELECT
    (COUNT(parent.name) - 1) AS depth,
    child.*
  FROM
    asset AS child,
    asset AS parent
  WHERE
    child.lft BETWEEN parent.lft AND parent.rght
    AND
    parent.tree_id = child.tree_id
  GROUP BY
    child.id,
    child.*
`;

const summaryComplementary = `
    SELECT
      DATE_TRUNC($1, measurement.ts) as timestamp,
      commodity.type,
      measurement.value
    FROM
      measurement
    JOIN
    (
      ${assetTableWithDepth}
    )
    AS asset
    ON asset.id = measurement.asset_id
    JOIN
      commodity ON commodity.id = measurement.commodity_id
    WHERE
      asset.name != $2
      AND
      asset.tree_id = (SELECT tree_id FROM asset WHERE name = $2)
      AND
      asset.depth =
      (
        SELECT
          depth
        FROM
        (
          ${assetTableWithDepth}
        )
        AS
          asset_depth_table
        WHERE
          asset_depth_table.name = $2
      )
      AND
      (
        commodity.type = $3
        OR
        $3 = '%' 
      )
      AND
      measurement.ts >= $4
      AND
      measurement.ts <= $5
      AND
      measurement.is_prediction = $6
`;

// *****************************************************
// *****************************************************

const records = `
    SELECT
        asset.name,
        DATE_TRUNC('HOUR', measurement.ts) as timestamp,
        commodity.type,
        SUM(measurement.value)
    FROM 
        measurement
    JOIN 
        asset ON asset.id = measurement.asset_id
    JOIN 
        commodity ON commodity.id = measurement.commodity_id
    WHERE
        asset.tree_id = (SELECT tree_id FROM asset WHERE name = %L)
    GROUP BY 
        asset.name, 
        commodity.type, 
        timestamp
`;

// *****************************************************
// *****************************************************

const unpivotedMeasurementQueries = {
  1: points,
  2: summary,
  3: summaryComplementary,
  4: records,
};

module.exports = { unpivotedMeasurementQueries };
