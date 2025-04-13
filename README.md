<p align="center">
  <img src="./api/public/images/Campus-Heartbeat-Logo.png" width="100" alt="project-logo">
</p>
<p align="center">
    <h1 align="center">HEARTBEAT</h1>
</p>
<p align="center">
    <em>The goal of this project is to support education, research, operations, and sustainability outreach.</em>
</p>

<br><!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary><br>

- [ Overview](#-overview)
- [ Features](#-features)
- [ Repository Structure](#-repository-structure)
- [ Modules](#-modules)
- [ Getting Started](#-getting-started)
  - [ Installation](#-installation)
  - [ Usage](#-usage)
  - [ Tests](#-tests)
- [ Project Roadmap](#-project-roadmap)
- [ Contributing](#-contributing)
- [ License](#-license)
- [ Acknowledgments](#-acknowledgments)
</details>
<hr>

##  Overview

The Heartbeat project orchestrates a robust database ecosystem with Postgres and pgAdmin, fostering geospatial data processing. Its core functionalities include generating color-coded visuals, structuring asset hierarchies, and forecasting measurements for streamlined analytics. Through its API module, Heartbeat empowers users to access real-time data points, historical records, and summary statistics seamlessly. Leveraging a dynamic architecture, this open-source initiative prioritizes data integrity, scalability, and user-centric data visualization, making it a valuable resource for spatial data analysis and forecasting applications.

---

##  Features

|    |   Feature         | Description |
|----|-------------------|---------------------------------------------------------------|
| ⚙️  | **Architecture**  | The project has a modular architecture that separates concerns between the database setup, API routes, data processing utilities, and API configuration using Express.js and PostgreSQL with PostGIS for geospatial functionalities. Docker is used for easy containerization, ensuring a consistent development environment. |
| 🔩 | **Code Quality**  | The codebase maintains a high level of quality and follows a consistent style. It includes clear documentation, structured folder organization, and meaningful variable naming conventions. Code formatting is enforced with Prettier, enhancing readability and maintainability. |
| 📄 | **Documentation** | The project features extensive documentation covering essential components such as Docker setups, SQL scripts, API routes, and utility functions. This comprehensive documentation aids in understanding the project's structure, functionality, and usage. |
| 🔌 | **Integrations**  | Key integrations include Docker for containerization, Express for API development, and PostgreSQL with postgis extension for geospatial data processing. Additional dependencies like crypto-js and react-querybuilder enhance data encryption and querying capabilities. |
| 🧩 | **Modularity**    | The codebase exhibits a high degree of modularity with clearly defined modules for API routes, database scripts, utility functions, and constants. This modular design promotes code reusability, maintainability, and scalability for future enhancements. |
| ⚡️  | **Performance**   | The project focuses on efficiency by optimizing database schema design, utilizing indexed tables, and efficiently populating data for quick retrieval. Express-rate-limit and express-slow-down are employed for managing server performance and preventing abuse. |
| 🛡️ | **Security**      | Security measures such as data encryption using crypto-js, server-side rate limiting with Express-rate-limit, and CORS handling for secure data access are implemented. The project maintains data integrity and access control through robust encryption and server configurations. |
| 📦 | **Dependencies**  | Key dependencies include Docker for container orchestration, Express for API framework, PostgreSQL with postgis for geospatial support, and various npm packages like body-parser, cors, and pg for efficient API development. |

---

##  Repository Structure

```sh
└── heartbeat/
    ├── LICENSE
    ├── README.md
    ├── api
    │   ├── Dockerfile
    │   ├── Dockerfile-heroku
    │   ├── constants
    │   ├── get_routes
    │   ├── heroku.yml
    │   ├── index.js
    │   ├── lib
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── routes
    │   └── utils
    ├── data
    │   ├── asset.csv
    │   ├── asset_geometry.csv
    │   ├── citysim_prediction_measurement.csv
    │   ├── measurement.csv
    │   ├── measurement_prediction_type.csv
    │   ├── measurement_type.csv
    │   ├── metadata.csv
    │   ├── pa_measurement.csv
    │   └── xgboost_prediction_measurement.csv
    ├── db
    │   ├── 01_create_extensions.sql
    │   ├── 02_create_procedures.sql
    │   ├── 03_create_functions.sql
    │   ├── 04_create_tables.sql
    │   ├── 05_populate_tables.sql
    │   ├── Dockerfile
    │   └── index.sql
    ├── docker-compose.yml
    ├── env.development.example
    ├── run_docker.sh
    └── utils
        ├── add_new_col_to_measurements.py
        ├── create_prediction_measurement.py
        ├── drop_measurement_duplicates.py
        ├── remove_col_from_measurements.py
        ├── remove_id_from_measurements.py
        └── run_tests.py
```

---

##  Modules

<details closed><summary>.</summary>

| File                                                                                                    | Summary                                                                                                                                                                                                                           |
| ---                                                                                                     | ---                                                                                                                                                                                                                               |
| [docker-compose.yml](https://github.com/missionloyd/heartbeat/blob/master/docker-compose.yml)           | Sets up database container with Postgres, pgAdmin for database management, and API container with nodemon for development; ensures connection between API and database for local development using defined environment variables. |
| [env.development.example](https://github.com/missionloyd/heartbeat/blob/master/env.development.example) | Defines essential environment variables for Express.js API, PostgreSQL Database, and pgAdmin. Facilitates local development, port customization, API access configuration, and database connectivity for the Heartbeat project.   |
| [run_docker.sh](https://github.com/missionloyd/heartbeat/blob/master/run_docker.sh)                     | Orchestrates building and running of Docker containers for development environment. Sets necessary environment variables and triggers container build, startup, and logging.                                                      |

</details>

<details closed><summary>db</summary>

| File                                                                                                         | Summary                                                                                                                                                                                                                                                      |
| ---                                                                                                          | ---                                                                                                                                                                                                                                                          |
| [03_create_functions.sql](https://github.com/missionloyd/heartbeat/blob/master/db/03_create_functions.sql)   | Defines functions to generate hexadecimal color from a score and create a tree JSON for a given parent ID. These functions contribute to database functionality supporting the visualization and interpretation of data within the repositorys architecture. |
| [01_create_extensions.sql](https://github.com/missionloyd/heartbeat/blob/master/db/01_create_extensions.sql) | Creates PostgreSQL postgis extension to enable geospatial functionalities in the database. Integrates with the repositorys architecture to support location-based data processing and queries.                                                               |
| [05_populate_tables.sql](https://github.com/missionloyd/heartbeat/blob/master/db/05_populate_tables.sql)     | Populate various database tables with initial data from CSV files, creating indexes for efficient querying in the API. The script imports data for assets, measurements, metadata, and prediction types, crucial for the systems functionality.              |
| [04_create_tables.sql](https://github.com/missionloyd/heartbeat/blob/master/db/04_create_tables.sql)         | Defines tables for asset management, measurements, metadata & asset geometry. Enforces relational integrity using foreign keys. Maintains uniqueness of measurements. Enables structured storage and retrieval of critical data in the API ecosystem.        |
| [Dockerfile](https://github.com/missionloyd/heartbeat/blob/master/db/Dockerfile)                             | Configures PostgreSQL Docker container with PostGIS extension using custom SQL scripts for automated initialization.                                                                                                                                         |
| [index.sql](https://github.com/missionloyd/heartbeat/blob/master/db/index.sql)                               | Manages database schema creation and data population by invoking SQL script files sequentially. Key component of the heartbeat repositorys database configuration.                                                                                           |
| [02_create_procedures.sql](https://github.com/missionloyd/heartbeat/blob/master/db/02_create_procedures.sql) | Implements procedures for managing asset hierarchy and inserting measurements accurately in the DB. Ensures data integrity by handling asset relationships and foreign keys efficiently. Enhances data consistency and system reliability.                   |

</details>

<details closed><summary>utils</summary>

| File                                                                                                                            | Summary                                                                                                                                                                                                                       |
| ---                                                                                                                             | ---                                                                                                                                                                                                                           |
| [add_new_col_to_measurements.py](https://github.com/missionloyd/heartbeat/blob/master/utils/add_new_col_to_measurements.py)     | Updates measurement data with a new column for prediction types, simplifying data analysis and enhancing forecasting capabilities within the repositorys data processing workflows.                                           |
| [remove_col_from_measurements.py](https://github.com/missionloyd/heartbeat/blob/master/utils/remove_col_from_measurements.py)   | Updates measurement data by retaining specific columns and saving changes back to the CSV file.                                                                                                                               |
| [run_tests.py](https://github.com/missionloyd/heartbeat/blob/master/utils/run_tests.py)                                         | Tests API routes, parses JSON responses, and extracts specific data fields. Allows customization of payload and fields to test different routes. Run tests for routes like deviation, points, or summary with various fields. |
| [create_prediction_measurement.py](https://github.com/missionloyd/heartbeat/blob/master/utils/create_prediction_measurement.py) | Generates prediction measurements from data files, aligning columns with predefined types and mapping to asset IDs. Outputs organized CSV.                                                                                    |
| [drop_measurement_duplicates.py](https://github.com/missionloyd/heartbeat/blob/master/utils/drop_measurement_duplicates.py)     | Cleanses pa_measurement.csv by removing duplicate rows based on specific columns, ensuring data integrity within the APIs database.                                                                                           |
| [remove_id_from_measurements.py](https://github.com/missionloyd/heartbeat/blob/master/utils/remove_id_from_measurements.py)     | Updates measurement data by removing the id column using Pandas, enhancing data integrity and readability within the data directory.                                                                                          |

</details>

<details closed><summary>api</summary>

| File                                                                                            | Summary                                                                                                                                                                                                                                                                                                                                                        |
| ---                                                                                             | ---                                                                                                                                                                                                                                                                                                                                                            |
| [package-lock.json](https://github.com/missionloyd/heartbeat/blob/master/api/package-lock.json) | This code file in the `api` directory of the repository serves as the main entry point for the API service. It defines the routes and business logic for handling requests and responses. The critical features include the setup of API routes and core functionality, encapsulated within a modular architecture to enhance maintainability and scalability. |
| [package.json](https://github.com/missionloyd/heartbeat/blob/master/api/package.json)           | Defines Heartbeat API dependencies for Express server, including body-parser, cors, crypto-js. Enables server-side rate limiting and slow-down functionality. Facilitates server maintenance with Nodemon. Lists React dependencies for front-end integration. Includes development dependency for code formatting.                                            |
| [Dockerfile-heroku](https://github.com/missionloyd/heartbeat/blob/master/api/Dockerfile-heroku) | Coordinates setup and initialization for the Node.js app on Heroku. Copies essential components and dependencies, setting up the working directory and installing necessary packages. Ultimately launches the application for deployment.                                                                                                                      |
| [index.js](https://github.com/missionloyd/heartbeat/blob/master/api/index.js)                   | Defines Express server routes for various data queries, integrating with the database and setting up middleware for logging and CORS handling. Initiates the server to listen on a specified port, showcasing the systems health with a basic API endpoint.                                                                                                    |
| [heroku.yml](https://github.com/missionloyd/heartbeat/blob/master/api/heroku.yml)               | Implements Heroku setup for PostgreSQL database using a custom Docker image specified in `Dockerfile-heroku` within `api` directory. Configures the necessary addons and build settings to deploy the API service seamlessly.                                                                                                                                  |
| [Dockerfile](https://github.com/missionloyd/heartbeat/blob/master/api/Dockerfile)               | Enables dynamic behavior based on environment for the API service within the repository. Determines whether to use nodemon for development or npm start for production. Manages dependencies, sets working directory, and runs the application accordingly.                                                                                                    |

</details>

<details closed><summary>api.routes</summary>

| File                                                                                     | Summary                                                                                                                                                                                                                                                                         |
| ---                                                                                      | ---                                                                                                                                                                                                                                                                             |
| [tree.js](https://github.com/missionloyd/heartbeat/blob/master/api/routes/tree.js)       | Enables fetching tree data based on a provided parent ID using an Express router. Handles missing data scenarios and potential errors gracefully, returning appropriate responses. Facilitates seamless retrieval of hierarchical data within the repositorys API architecture. |
| [tables.js](https://github.com/missionloyd/heartbeat/blob/master/api/routes/tables.js)   | Retrieves tables data via API endpoint for frontend consumption. Uses Express Router to fetch tables info asynchronously from the backend. Sets response content type to JSON. Crucial for displaying database structure in the application.                                    |
| [assets.js](https://github.com/missionloyd/heartbeat/blob/master/api/routes/assets.js)   | Implements a router to fetch assets based on parent asset name. Handles missing data and server errors gracefully. Returns asset data with status codes for successful requests.                                                                                                |
| [records.js](https://github.com/missionloyd/heartbeat/blob/master/api/routes/records.js) | Implements a router in the API to retrieve data based on user queries from a normalized measurement table. Creates a view and queries records using the input data. Handles error cases and returns results with status.                                                        |

</details>

<details closed><summary>api.routes.space</summary>

| File                                                                                               | Summary                                                                                                                                                                                                                                        |
| ---                                                                                                | ---                                                                                                                                                                                                                                            |
| [summary.js](https://github.com/missionloyd/heartbeat/blob/master/api/routes/space/summary.js)     | Generates summary statistics for assets and campuses based on specified parameters. Handles missing data gracefully and returns results efficiently. Aligns with repositorys API architecture for data visualization and analysis.             |
| [points.js](https://github.com/missionloyd/heartbeat/blob/master/api/routes/space/points.js)       | Enables fetching data points for an asset based on specified criteria, handling missing data and error conditions. Integrates with existing routes and utilities for seamless data retrieval in the API module.                                |
| [latest.js](https://github.com/missionloyd/heartbeat/blob/master/api/routes/space/latest.js)       | Implements a route in the API to retrieve the latest data within 24 hours, handling missing data and errors gracefully. The code orchestrates data retrieval for a specific asset, considering historical data and various aggregation levels. |
| [deviation.js](https://github.com/missionloyd/heartbeat/blob/master/api/routes/space/deviation.js) | Enables fetching deviation data based on specified parameters using Express routes. Handles missing data cases gracefully, returning appropriate messages. Implements error handling to ensure robust data retrieval and transmission.         |

</details>

<details closed><summary>api.get_routes</summary>

| File                                                                                                     | Summary                                                                                                                                                                                                                                                |
| ---                                                                                                      | ---                                                                                                                                                                                                                                                    |
| [get_tree.js](https://github.com/missionloyd/heartbeat/blob/master/api/get_routes/get_tree.js)           | Generates tree structure for assets in the database based on parent ID. Uses predefined queries to fetch and format asset hierarchy data. Dynamic handling for leaf assets with no children.                                                           |
| [get_latest.js](https://github.com/missionloyd/heartbeat/blob/master/api/get_routes/get_latest.js)       | Retrieves the latest measurement data for a specified asset within the last 24 hours. Queries the database for measurement types and constructs a query to fetch the data based on input parameters. Ideal for real-time monitoring applications.      |
| [get_records.js](https://github.com/missionloyd/heartbeat/blob/master/api/get_routes/get_records.js)     | Retrieves and filters records from a database based on user query using provided functions. The feature enables frontend interaction for fetching specific data from designated database views within the repositorys architecture.                    |
| [get_summary.js](https://github.com/missionloyd/heartbeat/blob/master/api/get_routes/get_summary.js)     | Generates aggregate summaries for specified assets based on input criteria. Queries database for measurement types, constructs dynamic SQL, and returns summarized data for analysis and visualization.                                                |
| [get_deviation.js](https://github.com/missionloyd/heartbeat/blob/master/api/get_routes/get_deviation.js) | Defines a function to fetch deviation data for an asset based on specified parameters. Translates measurement types and processes query results before returning them. Supports aggregation and date-level filtering for analytics in the API module.  |
| [get_points.js](https://github.com/missionloyd/heartbeat/blob/master/api/get_routes/get_points.js)       | Retrieves measurement points based on asset, dates, type, and aggregation level from the database. Dynamically builds queries using measurement types. Contributing to data visualization and analytics within the API module.                         |
| [get_tables.js](https://github.com/missionloyd/heartbeat/blob/master/api/get_routes/get_tables.js)       | Retrieves all tables from the database using the DB connection, facilitating dynamic access to table names without hardcoding. Aligns with the repositorys modular architecture for flexible and scalable API table management.                        |
| [get_assets.js](https://github.com/missionloyd/heartbeat/blob/master/api/get_routes/get_assets.js)       | Retrieves child assets under a specific parent asset in the repositorys API module. Utilizes a database query to fetch assets based on parent asset name, ensuring hierarchy integrity. The extracted assets are then returned for further processing. |

</details>

<details closed><summary>api.lib</summary>

| File                                                                        | Summary                                                                                                                                                                                                               |
| ---                                                                         | ---                                                                                                                                                                                                                   |
| [db.js](https://github.com/missionloyd/heartbeat/blob/master/api/lib/db.js) | Manages database connections, parsing numeric data as floats. Instantiates a connection pool, handles errors, and provides methods to fetch all tables and execute queries. Adapts SSL settings based on environment. |

</details>

<details closed><summary>api.utils</summary>

| File                                                                                                                                                      | Summary                                                                                                                                                                                                                                                     |
| ---                                                                                                                                                       | ---                                                                                                                                                                                                                                                         |
| [return_or_error_flag.js](https://github.com/missionloyd/heartbeat/blob/master/api/utils/return_or_error_flag.js)                                         | Ensures boolean validation by converting strings to boolean, handles errors, and returns the evaluated boolean. This utility function standardizes flag values across the repositorys API components.                                                       |
| [build_historical_measurement_table_query.js](https://github.com/missionloyd/heartbeat/blob/master/api/utils/build_historical_measurement_table_query.js) | Generates SQL queries to pivot historical measurement data for various types, aggregating values based on specified aggregation methods. Refers to constant queries for unpivoted data and dynamically builds pivot statements.                             |
| [build_present_measurement_table_query.js](https://github.com/missionloyd/heartbeat/blob/master/api/utils/build_present_measurement_table_query.js)       | Generates SQL queries for pivoted present measurement data based on type and aggregation. Leveraging predefined constants for query structure.                                                                                                              |
| [create_records_view.js](https://github.com/missionloyd/heartbeat/blob/master/api/utils/create_records_view.js)                                           | Generates and populates a dynamic SQL view for aggregated measurement data grouped by asset type and timestamp. Handles pivoting and column formatting based on measurement types.                                                                          |
| [processSQL.js](https://github.com/missionloyd/heartbeat/blob/master/api/utils/processSQL.js)                                                             | Transforms parameterized SQL generated by `react-querybuilder` to `pg` format by replacing question marks with sequential placeholders.                                                                                                                     |
| [build_measurement_query.js](https://github.com/missionloyd/heartbeat/blob/master/api/utils/build_measurement_query.js)                                   | Generates an SQL query for a normalized measurement table by combining present and historical data. Handles different measurement types, query types, and aggregation, ensuring proper column structure and table joining for accurate data representation. |

</details>

<details closed><summary>api.constants</summary>

| File                                                                                                                                    | Summary                                                                                                                                                                                                                                          |
| ---                                                                                                                                     | ---                                                                                                                                                                                                                                              |
| [unpivoted_present_queries.js](https://github.com/missionloyd/heartbeat/blob/master/api/constants/unpivoted_present_queries.js)         | Defines SQL queries for asset data in different formats, including asset details with aggregation, asset hierarchy with depth, and latest asset values. Organizes queries by type for easy retrieval.                                            |
| [unpivoted_historical_queries.js](https://github.com/missionloyd/heartbeat/blob/master/api/constants/unpivoted_historical_queries.js)   | Defines queries for historical asset data aggregation and retrieval, including asset details, types, and values. Supports different aggregation methods based on specified time intervals. Organizes queries as a collection for modular access. |
| [measurement_type_translations.js](https://github.com/missionloyd/heartbeat/blob/master/api/constants/measurement_type_translations.js) | Defines translations between measurement types and their human-readable labels for API responses, enhancing data clarity.                                                                                                                        |
| [tree_queries.js](https://github.com/missionloyd/heartbeat/blob/master/api/constants/tree_queries.js)                                   | Defines tree querying logic, including a nested query to retrieve hierarchical data from the asset table. Exports functions to fetch tree view data and structure it with parent-child relationships.                                            |
| [deviation_query.js](https://github.com/missionloyd/heartbeat/blob/master/api/constants/deviation_query.js)                             | Generates deviation query incorporating statistical calculations and color coding for assets. Joins with metadata and asset geometry for visualization.                                                                                          |
| [measurement_query_types.js](https://github.com/missionloyd/heartbeat/blob/master/api/constants/measurement_query_types.js)             | Defines measurement query types using a JavaScript enum for the API in the parent repository. Categorizes queries as Asset, AssetComplementary, and Latest for data retrieval.                                                                   |

</details>

---

## Running the Application

Run the multi-container Docker application:

```shell
chmod u+x run_docker.sh
./run_docker.sh
```

Verify that the application is properly running by navigating to `localhost:<API_PORT>` within your browser. 

## Publishing the Database
```shell
heroku login
heroku container:login
heroku create heartbeat-db
heroku git:remote -a heartbeat-db
heroku stack:set container
heroku buildpacks:set heroku/nodejs
heroku addons:create heroku-postgresql:standard-0
git subtree push --prefix api/ heroku main
heroku pg:psql
\i db/index.sql
```

## Updating the API Code
```shell
git subtree push --prefix api/ heroku main
```

##  Contributing

Contributions are welcome! Here are several ways you can contribute:

- **[Report Issues](https://github.com/missionloyd/heartbeat/issues)**: Submit bugs found or log feature requests for the `heartbeat` project.
- **[Submit Pull Requests](https://github.com/missionloyd/heartbeat/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.
- **[Join the Discussions](https://github.com/missionloyd/heartbeat/discussions)**: Share your insights, provide feedback, or ask questions.

<details closed>
<summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your github account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone https://github.com/missionloyd/heartbeat
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to github**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.
8. **Review**: Once your PR is reviewed and approved, it will be merged into the main branch. Congratulations on your contribution!
</details>