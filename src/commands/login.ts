import { CommandHandler } from "./types";
import { getUserByName } from "../lib/db/queries/users";
import { setUser } from "../config";
import { withDb } from "../lib/db/withDb";

export const handlerLogin: CommandHandler = async (_, ...args) => {
  if (args.length === 0) {
    throw new Error("missing username");
  }

  const username = args[0];

  await withDb(async (db) => {
    const user = await getUserByName(db, username);

    if (!user) {
      throw new Error("user doesnt exist");
    }

    setUser(user.name);
  });

  console.log(`"${username}" has been set`);
};
