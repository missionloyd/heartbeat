DO $$
DECLARE
  existing_tables_count INT;

BEGIN
  SELECT COUNT(*) INTO existing_tables_count
  FROM information_schema.tables
  WHERE table_schema = 'public';
  
  IF existing_tables_count > 0 THEN
    RAISE NOTICE 'Database already contains data. Initialization will be skipped.';
    RETURN;
  END IF;
END $$;

\i 'db/01_create_extensions.sql';
\i 'db/02_create_procedures.sql';
\i 'db/03_create_functions.sql';
\i 'db/04_create_tables.sql';
\i 'db/05_populate_tables.sql';