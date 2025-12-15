import type * as schema from "../../../schemas/schema";
import { feeds, users, feedFollows } from "../../../schemas/schema";
import { eq, and, sql } from "drizzle-orm";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";

export async function createFeed(
  db: PostgresJsDatabase<typeof schema>,
  params: {
    name: string;
    url: string;
    userId: string;
  }
) {
  const [result] = await db
    .insert(feeds)
    .values({
      name: params.name,
      url: params.url,
      userId: params.userId,
    })
    .returning();

  return result;
}

export async function getAllFeeds(db: PostgresJsDatabase<typeof schema>) {
  return await db
    .select({
      feedName: feeds.name,
      feedUrl: feeds.url,
      userName: users.name,
    })
    .from(feeds)
    .innerJoin(users, eq(feeds.userId, users.id));
}

export async function getFeedByUrl(
  db: PostgresJsDatabase<typeof schema>,
  url: string
) {
  return await db.query.feeds.findFirst({
    where: eq(feeds.url, url),
  });
}

export async function markFeedFetched(
  db: PostgresJsDatabase<typeof schema>,
  feedId: string
){
  const [feed] = await db
  .update(feeds)
  .set({updatedAt: new Date(), lastFetchedAt: new Date()})
  .where(eq(feeds.id, feedId))
  .returning();

  return feed
}

export async function getNextFeedToFetch(
  db: PostgresJsDatabase<typeof schema>,
){
  const [feed] = await db
  .select()
  .from(feeds)
  .orderBy(sql`${feeds.lastFetchedAt} ASC NULLS FIRST`)
  .limit(1);

  return feed;
}