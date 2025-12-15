import { CommandHandler } from "./types";
import { getAllUsers } from "../lib/db/queries/users";
import { readConfig } from "../config";
import { withDb } from "../lib/db/withDb";

export const usersHandler: CommandHandler = async (_, ...args) => {
  

  await withDb(async (db) => {
    const result = await getAllUsers(db);
    const {currentUserName} = await readConfig();

    for (const row of result) {
      if(row.name === currentUserName){
          console.log(`* ${row.name} (current)`);
      }
      console.log(`* ${row.name}`);
    } 
    
  });
};
