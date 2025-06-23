FROM postgres:16

# Install `gawk` to run the `transform.awk` file.
# Install `postgresql-16-postgis-3` and `postgis` to add on the PostGIS extension.
RUN apt-get update
# RUN apt-get -y install gawk
RUN apt-get -y install postgresql-16-postgis-3
RUN apt-get -y install postgis

# The "docker-entrypoint-initdb.d" directory will automatically run these scripts:
# COPY index.sql /docker-entrypoint-initdb.d
COPY init.sh /docker-entrypoint-initdb.d