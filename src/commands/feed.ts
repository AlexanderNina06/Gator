import { readConfig } from "src/config";
import { CommandHandler, UserCommandHandler } from "./types";
import { createFeed } from "src/lib/db/queries/feeds";
import { getUserByName } from "src/lib/db/queries/users";
import { withDb } from "../lib/db/withDb";
import { printFeed } from "src/lib/feeds/printFeed";
import { followFeed } from "src/lib/db/queries/feedFollow";

export const addFeedHandler: UserCommandHandler =
  async (_, user, ...args) => {

  let nameParts: string[] = [];
  let url: string | undefined;

  for (const arg of args) {
    try {
      new URL(arg.trim());
      url = arg.trim();
    } catch {
      nameParts.push(arg);
    }
  }

  if (!url) {
    throw new Error("feed url is required");
  }

  const feedName = nameParts.join(" ").trim();

  await withDb(async (db) => {
    const feed = await createFeed(db, {
      name: feedName,
      url,
      userId: user.id,
    });

    await followFeed(db, {
      url: feed.url,
      userName: user.name,
    });

    printFeed(feed, user);
  });
};
