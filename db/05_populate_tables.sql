
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

\copy public.measurement FROM 'data/measurement.csv' DELIMITER '|' CSV HEADER NULL AS '';
