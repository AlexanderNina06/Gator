import type * as schema from "../../../schemas/schema";
import { feeds, users, feedFollows } from "../../../schemas/schema";
import { eq, and } from "drizzle-orm";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";

export async function followFeed(
  db: PostgresJsDatabase<typeof schema>,
  params: {
    url: string;
    userName: string;
  }
) {
  return db.transaction(async (tx) => {
    // 1. Verifiy feed exists
    const feed = await tx.query.feeds.findFirst({
      where: eq(feeds.url, params.url),
    });

    if (!feed) {
      throw new Error(`feed not found for url: ${params.url}`);
    }

    // 2. Verify user exists
    const user = await tx.query.users.findFirst({
      where: eq(users.name, params.userName),
    });

    if (!user) {
      throw new Error(`user not found: ${params.userName}`);
    }

    // 3. create feed follow
    const [follow] = await tx
      .insert(feedFollows)
      .values({
        userId: user.id,
        feedId: feed.id,
      })
      .returning();

    // 4. Obtain details
    const [result] = await tx
      .select({
        followId: feedFollows.id,
        feedName: feeds.name,
        feedUrl: feeds.url,
        userName: users.name,
      })
      .from(feedFollows)
      .innerJoin(users, eq(feedFollows.userId, users.id))
      .innerJoin(feeds, eq(feedFollows.feedId, feeds.id))
      .where(eq(feedFollows.id, follow.id));

    return result;
  });
}

export async function unfollowFeed(
  db: PostgresJsDatabase<typeof schema>,
  params: {
    userId: string;
    url: string
  }){
    return db.transaction(async (tx) => {
      const feed = await tx.query.feeds.findFirst({
      where: eq(feeds.url, params.url),
      });

      if (!feed) {
        throw new Error(`feed not found for url: ${params.url}`);
      }

      const [deleted] = await tx
      .delete(feedFollows)
      .where(
        and(
          eq(feedFollows.userId, params.userId),
          eq(feedFollows.feedId, feed.id)
        )
      )
      .returning();

      return deleted
    })
}

export async function getFeedFollowsForUser(
  db: PostgresJsDatabase<typeof schema>,
  params: {
    userId: string;
  }
) {
  return await db.select().from(feedFollows)
  .innerJoin(users, eq(feedFollows.userId, users.id))
  .innerJoin(feeds, eq(feedFollows.feedId, feeds.id))
  .where(eq(feedFollows.userId, params.userId))
}
