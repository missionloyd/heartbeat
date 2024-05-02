
-- -----------------------------------------------------------------------------------------------------

\copy public.asset FROM '/db_data/asset.csv' DELIMITER '|' CSV HEADER NULL AS '';

CREATE INDEX name_index ON public.asset USING btree (name);

-- -----------------------------------------------------------------------------------------------------

\copy public.commodity FROM '/db_data/commodity.csv' DELIMITER '|' CSV HEADER NULL AS '';

-- -----------------------------------------------------------------------------------------------------

\copy public.metadata FROM '/db_data/metadata.csv' QUOTE '^' DELIMITER '|' CSV HEADER NULL AS '';

-- -----------------------------------------------------------------------------------------------------

\copy public.measurement FROM '/db_data/measurement.csv' DELIMITER '|' CSV HEADER NULL AS '';
