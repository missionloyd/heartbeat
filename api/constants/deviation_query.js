const unpivotedMeasurementQuery = (aggregation, geometryMeasurementTypeIdList) => `
    unpivoted_measurement AS (
        SELECT
            asset.id,
            asset.name,
            DATE_TRUNC($1, measurement.ts) AS timestamp,
            measurement_type.name AS measurement_type,
            ${aggregation}(measurement.value) AS value
        FROM
            measurement
        JOIN
            asset ON asset.id = measurement.asset_id
        JOIN
            measurement_type ON measurement_type.id = measurement.measurement_type_id
        WHERE
            (
                asset.name = $4 OR $4 = '%'
            )
            AND
            measurement_type.name = $5
            AND
            measurement.is_prediction = $6
            AND
            measurement.ts >= $2
            AND
            measurement.ts <= $3
            AND (
                measurement_type.id NOT IN (${geometryMeasurementTypeIdList.join(",")})
                OR
                    EXISTS (
                        SELECT 
                            asset_id
                        FROM 
                            asset_geometry 
                        WHERE
                            asset.id = asset_geometry.asset_id
                    )
            )
        GROUP BY
            asset.id,
            asset.name,
            timestamp,
            measurement_type
    )
`;

const tableWithStats = `
    table_with_stats AS (
        SELECT
            id,
            name,
            measurement_type,
            AVG(value) AS average,
            STDDEV_POP(value) AS standard_deviation,
            MAX(timestamp) AS last_seen,
            (
                SELECT
                    value
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
                        t3.measurement_type = t1.measurement_type
                )
                AND
                t2.name = t1.name
                AND
                t2.measurement_type = t1.measurement_type
            ) AS latest
        FROM
            unpivoted_measurement AS t1
        GROUP BY
            id,
            name,
            measurement_type
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

const deviationQuery = (aggregation, geometryMeasurementTypeIdList) => `
    WITH
        ${unpivotedMeasurementQuery(aggregation, geometryMeasurementTypeIdList)},
        ${tableWithStats},
        ${tableWithColor}
    SELECT
        table_with_color.name,
        table_with_color.measurement_type,
        table_with_color.average,
        table_with_color.latest,
        table_with_color.last_seen,
        table_with_color.color,
        JSON_BUILD_OBJECT(
            'geometry', JSON_AGG(ST_AsGeoJSON(asset_geometry.polygons)),
            'properties', JSON_AGG(asset_geometry.properties)
        ) AS geodata,
        metadata.data AS metadata
    FROM
        table_with_color
    JOIN
        metadata ON metadata.asset_id = table_with_color.id  
    LEFT JOIN
        asset_geometry ON asset_geometry.asset_id = table_with_color.id
    GROUP BY
        table_with_color.name,
        table_with_color.measurement_type,
        table_with_color.average,
        table_with_color.latest,
        table_with_color.last_seen,
        table_with_color.color,
        metadata.data
    ORDER BY table_with_color.name
`;

module.exports = { deviationQuery };