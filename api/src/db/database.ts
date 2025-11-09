import dotenv from "dotenv";
import { Pool, QueryResult } from "pg";

dotenv.config();

// Create connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection cannot be established
});

// Event listeners for connection monitoring
pool.on("connect", () => {
  console.log(" Connected to PostgreSQL database");
});

pool.on("error", (err) => {
  console.error(" Unexpected error on idle PostgreSQL client:", err);
  process.exit(-1);
});

// Query function with error handling
export const query = async (
  text: string,
  params?: any[]
): Promise<QueryResult> => {
  const start = Date.now();
  try {
    const result = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log("Executed query", { text, duration, rows: result.rowCount });
    return result;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
};

// Get a client from the pool (for transactions)
export const getClient = async () => {
  const client = await pool.connect();
  return client;
};

// Graceful shutdown
export const closePool = async () => {
  await pool.end();
  console.log("Database pool has ended");
};

// Handle process termination
process.on("SIGINT", async () => {
  await closePool();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await closePool();
  process.exit(0);
});

export default pool;
