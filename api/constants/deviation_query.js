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

const tableWithStats = `
    table_with_stats AS (
        SELECT
            id,
            name,
            latitude,
            longitude,
            commodity,
            AVG(sum_value) AS average,
            STDDEV_POP(sum_value) AS standard_deviation,
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
            ) AS latest_value
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

const tableWithColor = `
    table_with_color AS (
        SELECT
            *,
            generate_hex_using_score(
                (latest_value - average) / standard_deviation
            ) AS hex_color
        FROM
            table_with_stats
    )
`;

const deviationQuery = `
    WITH
        ${unpivotedMeasurementQuery},
        ${tableWithStats},
        ${tableWithColor}
    SELECT
        table_with_color.name,
        table_with_color.latitude,
        table_with_color.longitude,
        table_with_color.commodity,
        table_with_color.average,
        table_with_color.standard_deviation,
        table_with_color.latest_value,
        table_with_color.hex_color,
        JSON_AGG(ST_AsGeoJSON(asset_geometry.data)) AS geometry
    FROM
        table_with_color
    JOIN
        asset_geometry ON asset_geometry.asset_id = table_with_color.id
    GROUP BY
        table_with_color.name,
        table_with_color.latitude,
        table_with_color.longitude,
        table_with_color.commodity,
        table_with_color.average,
        table_with_color.standard_deviation,
        table_with_color.latest_value,
        table_with_color.hex_color
`;

module.exports = { deviationQuery };