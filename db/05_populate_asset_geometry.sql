CREATE TEMP TABLE temp_jsonb (data JSONB);

\copy temp_jsonb FROM '/data/asset_geometry.geojson';

INSERT INTO public.asset_geometry (asset_id, data)
SELECT
  asset.id AS asset_id,
  ST_GeomFromGeoJSON(temp.geometry::text) AS data
FROM
  (SELECT 
     (jsonb_array_elements(data->'features'))->'properties' AS properties,
     (jsonb_array_elements(data->'features'))->'geometry' AS geometry
   FROM 
     temp_jsonb) AS temp
JOIN
  asset ON asset.name = temp.properties->>'name';

DROP TABLE IF EXISTS temp_jsonb;