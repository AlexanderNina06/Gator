import { CommandHandler } from "./types";
import { withDb } from "../lib/db/withDb";
import { resetRecords } from "../lib/db/queries/users";

export const resetHandler: CommandHandler = async () => {
  await withDb(async (db) => {
    await resetRecords(db);
  });

  console.log("database reset successfully");
};
