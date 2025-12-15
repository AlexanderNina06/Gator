import { withDb } from "src/lib/db/withDb";
import { CommandHandler } from "./types";
import { getPostsForUser } from "src/lib/db/queries/posts";

export const browseHandler: CommandHandler = async (_, ...args) => {
  const limitArg = args[0];
  const parsedLimit = limitArg ? Number(limitArg) : undefined;

  const limit =
    parsedLimit && !isNaN(parsedLimit) && parsedLimit > 0
      ? parsedLimit
      : undefined;

  await withDb(async (db) => {
    const posts = await getPostsForUser(db, { limit });

    for (const post of posts) {
      console.log(`${post.title}`);
      console.log(`  ${post.url}`);
      console.log();
    }
  });
};
