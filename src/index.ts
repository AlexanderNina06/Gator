import { handlerLogin } from "./commands/login";
import { registerHandler } from "./commands/register";
import { registerCommand, runCommand } from "./commands/registry";
import { CommandsRegistry } from "./commands/types";
import { resetHandler } from "./commands/reset"
import { usersHandler } from "./commands/usersh"
import { aggHandler } from "./commands/agg";
import { addFeedHandler } from "./commands/feed";
import { feedsHandler } from "./commands/feeds";
import { followHandler, followingHandler } from "./commands/follow";
import { middlewareLoggedIn } from "./middlewares/middlewareLoggedIn";
import { unfollowHandler } from "./commands/unfollow";
import { browseHandler } from "./commands/browse";

async function main() {
  const registry: CommandsRegistry = {};

  registerCommand(registry, "login", handlerLogin);
  registerCommand(registry, "register", registerHandler);
  registerCommand(registry, "reset", resetHandler);
  registerCommand(registry, "users", usersHandler);
  registerCommand(registry, "agg", aggHandler);
  registerCommand(registry, "addfeed", middlewareLoggedIn(addFeedHandler));
  registerCommand(registry, "feeds", feedsHandler);
  registerCommand(registry, "follow", middlewareLoggedIn(followHandler));
  registerCommand(registry, "following", middlewareLoggedIn(followingHandler));
  registerCommand(registry, "unfollow", middlewareLoggedIn(unfollowHandler));
  registerCommand(registry, "browse", browseHandler);

  const args = process.argv.slice(2);

  if (args.length < 1) {
    console.error("not enough arguments provided");
    process.exit(1);
  }

  const [cmdName, ...cmdArgs] = args;

  try {
    await runCommand(registry, cmdName, ...cmdArgs);
  } catch (err) {
    console.error((err as Error).message);
    process.exit(1);
  }
  
}

main();
