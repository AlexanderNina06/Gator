import { users } from "../../../schemas/schema";
import { eq, sql  } from "drizzle-orm";

export async function createUser(db: any, name: string) {
  const [result] = await db
    .insert(users)
    .values({ name })
    .returning();

  return result;
}

export async function getUserByName(db: any, name: string) {
  return db.query.users.findFirst({
    where: eq(users.name, name),
  });
}

export async function getAllUsers(db: any) {
  return db.select({ name: users.name }).from(users);
}

export async function resetRecords(db: any) {
  await db.execute(sql`TRUNCATE TABLE ${users} CASCADE`);
}