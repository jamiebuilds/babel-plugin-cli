import init from "./commands/init";
import build from "./commands/build";
import publish from "./commands/publish";
import test from "./commands/test";
import help from "./commands/help";

const commandName = process.argv[2];

const commands = {
  init, i: init, new: init,
  build, b: build,
  test, t: test,
  publish, p: publish, push: publish,
  help, h: help
};

const command = commands[commandName || "help"];

if (!command) {
  console.error("Unknown command:", cmd);
  process.exit(1);
}

command();
