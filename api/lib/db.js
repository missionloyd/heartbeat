const { Pool, types } = require("pg");
const { DEV_MODE } = process.env;

// Return "NUMERIC" types as floating-point numbers.
types.setTypeParser(1700, (val) => parseFloat(val));

class Database {
  constructor() {
    this.connect();
  }

  connect() {
    const poolConfig = {
      connectionString: process.env.DATABASE_URL,
    };

    if (!DEV_MODE) {
      poolConfig.ssl = { rejectUnauthorized: false }; // Only enable TLS/SSL connections for Heroku.
    }

    this.pool = new Pool(poolConfig);

    // The pool with emit an error on behalf of any idle clients it contains if a backend error or network partition happens.
    this.pool.on("error", (err) => {
      console.error('Unexpected error on idle client "DATABASE" class: ', err);
      process.exit(-1);
    });
  }

  async getAllTables() {
    // Acquire a client from the pool.
    // If the pool is "full" and all clients are currently checked out, then this will wait in a FIFO queue until a client becomes available by it being released back to the pool.
    const client = await this.pool.connect();
    const data = await client.query(
      `
        SELECT tablename
        FROM pg_catalog.pg_tables
        WHERE schemaname = 'public'
          AND schemaname != 'pg_catalog'
          AND schemaname != 'information_schema'
      `
    );

    client.release();
    return data;
  }

  async query(...args) {
    const client = await this.pool.connect();
    const data = await client.query(...args);
    client.release();
    return data;
  }
}

module.exports = new Database();