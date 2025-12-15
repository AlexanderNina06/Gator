import { withDb } from "src/lib/db/withDb";
import { CommandHandler, UserCommandHandler } from "./types";
import { readConfig } from "src/config";
import { followFeed, getFeedFollowsForUser } from "src/lib/db/queries/feedFollow";
import { printFeedFollow } from "src/lib/feeds/printFeed";
import { getUserByName } from "src/lib/db/queries/users";

export const followHandler: UserCommandHandler =
  async (_, user, ...args) => {

  if (args.length < 1) {
    throw new Error("feed url is required");
  }

  let url: string;

  try {
    url = new URL(args[0].trim()).toString();
  } catch {
    throw new Error("invalid url");
  }

  const result = await withDb((db) =>
    followFeed(db, {
      url,
      userName: user.name,
    })
  );

  printFeedFollow(result);
};

export const followingHandler: UserCommandHandler =
  async (_, user) => {

  const follows = await withDb((db) =>
    getFeedFollowsForUser(db, { userId: user.id })
  );

  for (const follow of follows) {
    console.log(follow.feeds.name);
  }
};

