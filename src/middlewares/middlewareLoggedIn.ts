import { readConfig } from "../config";
import { withDb } from "../lib/db/withDb";
import { getUserByName } from "../lib/db/queries/users";
import type { CommandHandler } from "./types";
import type { users } from "../../src/schemas/schema";
import type { UserCommandHandler } from "./types";

export const middlewareLoggedIn =
  (handler: UserCommandHandler): CommandHandler =>
  async (cmdName, ...args) => {
    const { currentUserName } = readConfig();

    if (!currentUserName) {
      throw new Error("not logged in");
    }

    const user = await withDb((db) =>
      getUserByName(db, currentUserName)
    );

    if (!user) {
      throw new Error("current user not found");
    }

    return handler(cmdName, user, ...args);
  };
