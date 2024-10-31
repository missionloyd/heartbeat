
-- -----------------------------------------------------------------------------------------------------

\copy public.asset FROM 'data/asset.csv' DELIMITER '|' CSV HEADER NULL AS '';

CREATE INDEX name_index ON public.asset USING btree (name);

-- -----------------------------------------------------------------------------------------------------

\copy public.asset_geometry FROM 'data/asset_geometry.csv' QUOTE '^' DELIMITER '|' CSV HEADER NULL AS '';

-- -----------------------------------------------------------------------------------------------------

\copy public.commodity FROM 'data/commodity.csv' DELIMITER '|' CSV HEADER NULL AS '';

-- -----------------------------------------------------------------------------------------------------

\copy public.metadata FROM 'data/metadata.csv' QUOTE '^' DELIMITER '|' CSV HEADER NULL AS '';

-- -----------------------------------------------------------------------------------------------------

\copy public.measurement (asset_id, commodity_id, ts, is_prediction, value) FROM 'data/pa_measurement.csv' DELIMITER '|' CSV HEADER NULL AS '';

-- -----------------------------------------------------------------------------------------------------

\copy public.measurement (asset_id, commodity_id, ts, is_prediction, value) FROM 'data/prediction_measurement.csv' DELIMITER '|' CSV HEADER NULL AS '';

-- -----------------------------------------------------------------------------------------------------
