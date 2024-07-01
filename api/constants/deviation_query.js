const unpivotedMeasurementQuery = `
    unpivoted_measurement AS (
        SELECT
            asset.id,
            asset.name,
            DATE_TRUNC($1, measurement.ts) AS timestamp,
            commodity.type AS commodity,
            SUM(measurement.value) AS sum_value
        FROM
            measurement
        JOIN
            asset ON asset.id = measurement.asset_id
        JOIN
            commodity ON commodity.id = measurement.commodity_id
        WHERE
            EXISTS (
                SELECT 
                    asset_id
                FROM 
                    asset_geometry 
                WHERE
                    asset.id = asset_geometry.asset_id
            )
            AND
            (
                asset.name = $4 OR $4 = '%'
            )
            AND
            commodity.type = $5
            AND
            measurement.is_prediction = $6
            AND
            measurement.ts >= $2
            AND
            measurement.ts <= $3
        GROUP BY
            asset.id,
            asset.name,
            timestamp,
            commodity
    )
`;

const tableWithStats = `
    table_with_stats AS (
        SELECT
            id,
            name,
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
            ) AS latest
        FROM
            unpivoted_measurement AS t1
        GROUP BY
            id,
            name,
            commodity
    )
`;

const tableWithColor = `
    table_with_color AS (
        SELECT
            *,
            generate_hex_using_score(
                (latest - average) / NULLIF(standard_deviation, 0)
            ) AS color
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
        table_with_color.commodity,
        table_with_color.average,
        table_with_color.latest,
        table_with_color.color,
        JSON_BUILD_OBJECT(
            'geometry', JSON_AGG(ST_AsGeoJSON(asset_geometry.polygons)),
            'properties', JSON_AGG(asset_geometry.properties)
        ) AS geodata,
        metadata.data AS metadata
    FROM
        table_with_color
    JOIN
        asset_geometry ON asset_geometry.asset_id = table_with_color.id
    JOIN
        metadata ON metadata.asset_id = table_with_color.id
    GROUP BY
        table_with_color.name,
        table_with_color.commodity,
        table_with_color.average,
        table_with_color.latest,
        table_with_color.color,
        metadata.data
`;

module.exports = { deviationQuery };