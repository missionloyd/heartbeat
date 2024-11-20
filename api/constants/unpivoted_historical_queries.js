const asset = (aggregation) => `
  SELECT
    asset.id,
    asset.name,
    DATE_TRUNC($1, measurement.ts) as timestamp,
    commodity.type,
    ${aggregation}(measurement.value) 
  FROM 
    measurement
  JOIN 
    asset ON asset.id = measurement.asset_id
  JOIN 
    commodity ON commodity.id = measurement.commodity_id
  WHERE
    (
        asset.name = $2 
        OR 
        $2 = '%'
    )
    AND
    measurement.is_prediction = $5
  GROUP BY
    asset.id,
    asset.name,
    commodity.type, 
    timestamp
`;
// *****************************************************
// *****************************************************

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
  ORDER BY
    depth
`;

const assetComplementary = (aggregation) => `
  SELECT
    asset.id,
    asset.name,
    DATE_TRUNC($1, measurement.ts) as timestamp,
    commodity.type,
    ${aggregation}(measurement.value)
  FROM
    measurement
  JOIN
  (
    ${assetTableWithDepth}
  )
  AS asset ON asset.id = measurement.asset_id
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
    measurement.is_prediction = $5
  GROUP BY
    asset.id,
    asset.name,
    commodity.type,
    timestamp
`;

// *****************************************************
// *****************************************************

const latest = (aggregation) => `
  SELECT
    DATE_TRUNC('HOUR', measurement.ts) as timestamp,
    commodity.type,
    ${aggregation}(measurement.value) 
  FROM 
    measurement
  JOIN 
    asset ON asset.id = measurement.asset_id
  JOIN 
    commodity ON commodity.id = measurement.commodity_id
  WHERE 
    asset.name = $1
    AND
    measurement.is_prediction = $2
  GROUP BY
    commodity.type, 
    timestamp
`;

// *****************************************************
// *****************************************************

const unpivotedHistoricalQueries = {
  1: asset,
  2: assetComplementary,
  3: latest,
};

module.exports = { unpivotedHistoricalQueries };
