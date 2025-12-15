import { CommandHandler } from "./types";
import { fetchFeed } from "../lib/feeds/fetchFeed";
import {markFeedFetched, getNextFeedToFetch, getFeedByUrl} from "../lib/db/queries/feeds"
import { withDb } from "src/lib/db/withDb";
import { parseDuration } from "src/lib/utils/parseDuration";
import { runAggregator } from "src/lib/agg/runAggregator";

export const fetchFeedHandler : CommandHandler= async (_, ...args) =>{
  const obj = await fetchFeed("https://www.wagslane.dev/index.xml")
  console.log(JSON.stringify(obj, null, 2));
}

export const aggHandler: CommandHandler = async (_, ...args) => {
  if (args.length < 1) {
    throw new Error("time_between_reqs is required");
  }

  const durationStr = args[0];
  const timeBetweenRequests = parseDuration(durationStr);

  console.log(`Collecting feeds every ${durationStr}`);

  await runAggregator(timeBetweenRequests);
};
