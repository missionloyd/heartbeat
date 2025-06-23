psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -f "db/index.sql"

touch /tmp/init_complete
echo "Initialization complete."