import { withDb } from "src/lib/db/withDb";
import { UserCommandHandler } from "./types";
import { unfollowFeed } from "src/lib/db/queries/feedFollow";

export const unfollowHandler : UserCommandHandler = async (_, user, ...args) => {
  if (args.length < 1) {
    throw new Error("feed url is required");
  }

  let url: string;

  try {
    url = new URL(args[0].trim()).toString();
  } catch {
    throw new Error("invalid url");
  }
  const unfollowedFeed = await withDb((db) =>
      unfollowFeed(db, {
        userId: user.id,
        url
      })
    );

  if (!unfollowedFeed) {
    throw new Error("you were not following this feed");
  }

  console.log(`Unfollowed feed: ${url}`);
}