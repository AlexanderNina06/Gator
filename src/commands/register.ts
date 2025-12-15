import { CommandHandler } from "./types";
import { createUser, getUserByName } from "../lib/db/queries/users";
import { setUser } from "../config";
import { withDb } from "../lib/db/withDb";

export const registerHandler: CommandHandler = async (_, ...args) => {
  const username = args[0];

  if (!username) {
    throw new Error("missing username");
  }

  await withDb(async (db) => {
    const existingUser = await getUserByName(db, username);

    if (existingUser) {
      throw new Error("user already exists");
    }

    const data = await createUser(db, username);
    setUser(username);

    console.log(
      `user created successfully:
        id: ${data.id}
        name: ${data.name}
        createdAt: ${data.createdAt}
        updatedAt: ${data.updatedAt}`
    );
  });
};
