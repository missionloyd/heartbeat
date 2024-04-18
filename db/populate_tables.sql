
\copy public.asset FROM '/db_data/asset.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.commodity FROM '/db_data/commodity.csv' DELIMITER '|' CSV HEADER NULL AS '';
-- \copy public.metadata FROM '/db_data/metadata.csv' DELIMITER '|' CSV HEADER NULL AS '';
\copy public.measurement FROM '/db_data/measurement.csv' DELIMITER '|' CSV HEADER NULL AS '';
