import { scrapeFeeds } from "./scrapeFeeds";
import { handleError } from "../utils/handleError";

export async function runAggregator(timeBetweenRequests: number) {
  console.log("Starting aggregator");
  scrapeFeeds().catch(handleError);

  const interval = setInterval(() => {
    scrapeFeeds().catch(handleError);
  }, timeBetweenRequests);

  await new Promise<void>((resolve) => {
    process.on("SIGINT", () => {
      console.log("Shutting down feed aggregator...");
      clearInterval(interval);
      resolve();
    });
  });
}
