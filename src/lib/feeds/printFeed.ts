import { Feed, User } from "../../commands/types"; 

export function printFeed(feed: Feed, user: User) {
  console.log("Feed:");
  console.log(`  Name: ${feed.name}`);
  console.log(`  URL: ${feed.url}`);
  console.log(`  Added by: ${user.name}`);
  console.log(`  Created at: ${feed.createdAt.toISOString()}`);
  console.log("--------------------------------");
}

export function printFeedFollow(result: {
  feedName: string;
  feedUrl: string;
  userName: string;
}) {
  console.log("Feed followed successfully");
  console.log("-------------------------");
  console.log(`User: ${result.userName}`);
  console.log(`Feed: ${result.feedName}`);
  console.log(`URL:  ${result.feedUrl}`);
}
