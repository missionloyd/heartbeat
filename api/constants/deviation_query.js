const unpivotedMeasurementQuery = `
    unpivoted_measurement AS (
        SELECT
            asset.id,
            asset.name,
            metadata.data->'latitude' AS latitude,
            metadata.data->'longitude' AS longitude,
            DATE_TRUNC($1, measurement.ts) AS timestamp,
            commodity.type AS commodity,
            SUM(measurement.value) AS sum_value
        FROM
            measurement
        JOIN
            asset ON asset.id = measurement.asset_id
        JOIN
            commodity ON commodity.id = measurement.commodity_id
        JOIN
            metadata ON metadata.asset_id = measurement.asset_id
        WHERE
            measurement.ts >= $2
            AND
            measurement.ts <= $3
            AND
            asset.name = $4
            AND
            commodity.type = $5
        GROUP BY
            asset.id,
            asset.name,
            latitude,
            longitude,
            timestamp,
            commodity
    )
`;

const avgStddevLatestUnpivotedQuery = `
    avg_stddev_latest_unpivoted_measurement AS (
        SELECT
            id,
            name,
            latitude,
            longitude,
            commodity,
            AVG(sum_value) AS avg_sum,
            STDDEV_POP(sum_value) AS std_dev_sum,
            (
                SELECT
                    sum_value
                FROM
                    unpivoted_measurement AS t2
                WHERE timestamp = (
                    SELECT
                        MAX(timestamp)
                    FROM
                        unpivoted_measurement AS t3
                    WHERE
                        t3.name = t1.name
                        AND
                        t3.commodity = t1.commodity
                )
                AND
                t2.name = t1.name
                AND
                t2.commodity = t1.commodity
            ) AS latest_sum
        FROM
            unpivoted_measurement AS t1
        GROUP BY
            id,
            name,
            latitude,
            longitude,
            commodity
    )
`;

const deviationQuery = `
              WITH
              ${unpivotedMeasurementQuery},
              ${avgStddevLatestUnpivotedQuery}
          SELECT
            avg_stddev_latest_unpivoted_measurement.*,
            JSON_AGG(ST_AsGeoJSON(asset_geometry.data)) AS geometry
          FROM
              avg_stddev_latest_unpivoted_measurement
          JOIN
              asset_geometry ON asset_geometry.asset_id = avg_stddev_latest_unpivoted_measurement.id
          GROUP BY
              avg_stddev_latest_unpivoted_measurement.id,
              avg_stddev_latest_unpivoted_measurement.name,
              avg_stddev_latest_unpivoted_measurement.latitude,
              avg_stddev_latest_unpivoted_measurement.longitude,
              avg_stddev_latest_unpivoted_measurement.commodity,
              avg_stddev_latest_unpivoted_measurement.avg_sum,
              avg_stddev_latest_unpivoted_measurement.std_dev_sum,
              avg_stddev_latest_unpivoted_measurement.latest_sum
      `;

module.exports = { deviationQuery };