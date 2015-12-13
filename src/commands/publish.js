import readline from "readline";
import spawnMultiple from "../utils/spawn-multiple";

export default function publish() {
  const pkg = require(process.cwd() + "/package.json");

  console.log("Current version:", pkg.version);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question("New version (enter nothing for patch): ", newVersion => {
    rl.close();

    newVersion = newVersion || "patch";

    spawnMultiple([
      { command: "git", args: ["pull"] },
      { command: "git", args: ["push"] },
      { command: "babel-plugin", args: ["build"] },
      { command: "npm", args: ["version", newVersion] },
      { command: "npm", args: ["publish"] },
      { command: "git", args: ["push", "--follow-tags"] }
    ], () => {
      process.exit(0);
    });
  });
}
