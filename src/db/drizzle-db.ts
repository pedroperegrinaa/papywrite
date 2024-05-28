const connectionString = process.env.SUPABASE_DATABASE_URL as string;
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const client = postgres(connectionString);
const db = drizzle(client);

export default db;
