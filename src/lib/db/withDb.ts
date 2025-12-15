import * as schema from "../../schemas/schema";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { readConfig } from "src/config";


export async function withDb<T>(
  fn: (db: PostgresJsDatabase<typeof schema>) => Promise<T>
) {
  const conn = postgres(readConfig().dbUrl);

  const db = drizzle(conn, { schema }); 

  try {
    return await fn(db);
  } finally {
    await conn.end();
  }
}