import { XMLParser } from "fast-xml-parser";
import { RSSItem } from "../../commands/types";
import { RSSFeedSchema } from "./rssSchema";


export async function fetchFeed(feedURL: string) {
  const response = await fetch(feedURL, {
    method: "GET",
    headers: {
      "User-Agent": "gator",
      "Accept": "application/rss+xml, application/xml, text/xml",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const data = await response.text();

  const parser = new XMLParser({
    ignoreAttributes: false,
  });

  const parsedData = parser.parse(data);

  const feed = RSSFeedSchema.parse(parsedData);

  const {
    rss: {
      channel: {
        title: channelTitle,
        link: channelLink,
        description: channelDescription,
        item,
      },
    },
  } = feed;

  const items = Array.isArray(item) ? item : [];

  const finalArray: RSSItem[] = [];

  for (const rssItem of items) {
    const { title, link, pubDate } = rssItem;

    if (!title || !link || !pubDate) {
      continue;
    }

    finalArray.push(rssItem);
  }

  return {
    rss: {
      channel: {
        title: channelTitle,
        link: channelLink,
        description: channelDescription,
        item: finalArray,
      },
    },
  };

}
