import type * as schema from "../../../schemas/schema";
import { feeds, users, feedFollows, posts } from "../../../schemas/schema";
import { eq, and, sql,desc } from "drizzle-orm";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";

export async function createPost(
  db: PostgresJsDatabase<typeof schema>,
  params: {
    title: string;
    url: string;
    description?: string;
    publishedAt: Date;
    feedId: string;
  }
) {
  try {
    const [post] = await db
      .insert(posts)
      .values({
        title: params.title,
        url: params.url,
        description: params.description,
        publishedAt: params.publishedAt,
        feedId: params.feedId,
      })
      .returning();

    return post;
  } catch (err: any) {
    if (err?.cause?.code === "23505") {
      return null;
    }
    throw err;
  }
}


export async function getPostsForUser(
  db: PostgresJsDatabase<typeof schema>,
  { limit = 2 }: { limit?: number } = {}
){
  const safeLimit = Math.max(1, limit);
  return await db
  .select()
  .from(posts)
  .orderBy(desc(posts.publishedAt))
  .limit(safeLimit)
}