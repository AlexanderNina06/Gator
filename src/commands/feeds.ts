import { getAllFeeds } from "src/lib/db/queries/feeds";
import { withDb } from "src/lib/db/withDb";
import { CommandHandler } from "./types";

export const feedsHandler : CommandHandler = async (_, ...args) => { 
  const feeds = await withDb((db) => getAllFeeds(db));
  for (const feed of feeds) {
    console.log(`${feed.feedName} (${feed.feedUrl}) by ${feed.userName}`);
  }
}