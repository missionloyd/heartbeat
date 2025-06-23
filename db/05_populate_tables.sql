
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

\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/citysim_prediction_measurement_part1.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/citysim_prediction_measurement_part10.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/citysim_prediction_measurement_part11.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/citysim_prediction_measurement_part12.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/citysim_prediction_measurement_part13.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/citysim_prediction_measurement_part14.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/citysim_prediction_measurement_part15.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/citysim_prediction_measurement_part16.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/citysim_prediction_measurement_part17.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/citysim_prediction_measurement_part18.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/citysim_prediction_measurement_part19.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/citysim_prediction_measurement_part2.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/citysim_prediction_measurement_part20.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/citysim_prediction_measurement_part3.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/citysim_prediction_measurement_part4.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/citysim_prediction_measurement_part5.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/citysim_prediction_measurement_part6.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/citysim_prediction_measurement_part7.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/citysim_prediction_measurement_part8.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/citysim_prediction_measurement_part9.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part1.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part10.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part11.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part12.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part13.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part14.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part15.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part16.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part17.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part18.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part19.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part2.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part20.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part21.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part22.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part23.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part24.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part25.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part26.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part27.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part28.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part29.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part3.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part30.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part31.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part32.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part33.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part34.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part35.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part36.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part37.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part38.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part39.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part4.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part40.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part41.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part42.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part43.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part44.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part45.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part46.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part47.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part48.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part49.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part5.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part50.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part51.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part52.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part53.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part54.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part55.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part56.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part57.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part58.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part59.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part6.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part60.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part61.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part62.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part63.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part64.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part65.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part66.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part67.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part68.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part69.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part7.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part70.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part71.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part72.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part73.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part74.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part75.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part76.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part77.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part78.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part79.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part8.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part80.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/measurement_part9.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/pa_measurement_part1.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/pa_measurement_part2.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/pa_measurement_part3.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/xgboost_prediction_measurement_part1.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/xgboost_prediction_measurement_part10.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/xgboost_prediction_measurement_part11.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/xgboost_prediction_measurement_part12.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/xgboost_prediction_measurement_part13.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/xgboost_prediction_measurement_part14.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/xgboost_prediction_measurement_part15.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/xgboost_prediction_measurement_part16.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/xgboost_prediction_measurement_part17.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/xgboost_prediction_measurement_part18.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/xgboost_prediction_measurement_part19.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/xgboost_prediction_measurement_part2.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/xgboost_prediction_measurement_part20.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/xgboost_prediction_measurement_part21.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/xgboost_prediction_measurement_part22.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/xgboost_prediction_measurement_part23.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/xgboost_prediction_measurement_part24.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/xgboost_prediction_measurement_part25.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/xgboost_prediction_measurement_part26.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/xgboost_prediction_measurement_part27.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/xgboost_prediction_measurement_part28.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/xgboost_prediction_measurement_part29.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/xgboost_prediction_measurement_part3.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/xgboost_prediction_measurement_part30.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/xgboost_prediction_measurement_part31.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/xgboost_prediction_measurement_part32.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/xgboost_prediction_measurement_part33.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/xgboost_prediction_measurement_part4.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/xgboost_prediction_measurement_part5.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/xgboost_prediction_measurement_part6.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/xgboost_prediction_measurement_part7.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/xgboost_prediction_measurement_part8.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM 'data/measurement/xgboost_prediction_measurement_part9.csv' DELIMITER '|' CSV HEADER NULL AS '';