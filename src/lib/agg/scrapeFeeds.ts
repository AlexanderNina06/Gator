import { withDb } from "../db/withDb";
import { fetchFeed } from "../feeds/fetchFeed";
import {
  getNextFeedToFetch,
  markFeedFetched,
} from "../db/queries/feeds";
import { createPost } from "../db/queries/posts";
import { RSSItem } from "src/commands/types";

export async function scrapeFeeds() {
  await withDb(async (db) => {
    const nextFeed = await getNextFeedToFetch(db);
    if (!nextFeed) return;

    const rssFeed = await fetchFeed(nextFeed.url);

    for (const item of rssFeed.rss.channel.item) {
      const post = await createPost(db, {
        title: item.title,
        url: item.link,
        description: item.description,
        publishedAt: parsePublishedAt(item),
        feedId: nextFeed.id,
      });

      if (!post) continue;
    }

    await markFeedFetched(db, nextFeed.id);
  });
}
export function parsePublishedAt(item: RSSItem): Date {
  if (item.pubDate) {
    const date = new Date(item.pubDate);
    if (!isNaN(date.getTime())) return date;
  }

  if ((item as any).isoDate) {
    const date = new Date((item as any).isoDate);
    if (!isNaN(date.getTime())) return date;
  }

  return new Date();
}