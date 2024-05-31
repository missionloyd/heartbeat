FROM postgres:14

# Install `gawk` to run the `transform.awk` file.
# Install `postgresql-13-postgis-3` and `postgis` to add on the PostGIS extension.
RUN apt-get update
# RUN apt-get -y install gawk
RUN apt-get -y install postgresql-14-postgis-3
RUN apt-get -y install postgis

# Run `create.sql` on init.
# This extends the official Postgres image by adding a SQL file to the “docker-entrypoint-initdb.d” directory in the container.
# Additional initialization for an image derived from the postgres image.



# The "docker-entrypoint-initdb.d" directory will automatically run these scripts:
COPY 01_create_extensions.sql /docker-entrypoint-initdb.d/
COPY 02_create_procedures.sql /docker-entrypoint-initdb.d/
COPY 03_create_functions.sql /docker-entrypoint-initdb.d/
COPY 04_create_tables.sql /docker-entrypoint-initdb.d/
COPY 05_populate_tables.sql /docker-entrypoint-initdb.d/
COPY 06_populate_asset_geometry.sql /docker-entrypoint-initdb.d/