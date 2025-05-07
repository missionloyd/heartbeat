
-- -----------------------------------------------------------------------------------------------------

\copy public.asset FROM 'data/asset.csv' DELIMITER '|' CSV HEADER NULL AS '';

CREATE INDEX name_index ON public.asset USING btree (name);

-- -----------------------------------------------------------------------------------------------------

\copy public.asset_geometry FROM 'data/asset_geometry.csv' QUOTE '^' DELIMITER '|' CSV HEADER NULL AS '';

-- -----------------------------------------------------------------------------------------------------

\copy public.measurement_type FROM 'data/measurement_type.csv' DELIMITER '|' CSV HEADER NULL AS '';

-- -----------------------------------------------------------------------------------------------------

\copy public.measurement_prediction_type FROM 'data/measurement_prediction_type.csv' DELIMITER '|' CSV HEADER NULL AS '';

-- -----------------------------------------------------------------------------------------------------

\copy public.metadata FROM 'data/metadata.csv' QUOTE '^' DELIMITER '|' CSV HEADER NULL AS '';

-- -----------------------------------------------------------------------------------------------------

\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement.csv' DELIMITER '|' CSV HEADER NULL AS '';
-- \copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/pa_measurement.csv' DELIMITER ',' CSV HEADER NULL AS '';

-- -----------------------------------------------------------------------------------------------------

-- \copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/citysim_prediction_measurement.csv' DELIMITER '|' CSV HEADER NULL AS '';
-- \copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/xgboost_prediction_measurement.csv' DELIMITER '|' CSV HEADER NULL AS '';

-- -----------------------------------------------------------------------------------------------------
