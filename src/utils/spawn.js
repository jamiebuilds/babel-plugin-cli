import child from "child_process";

export default function spawn(cmd, args, callback) {
  console.log(">", cmd, args);

  var spawn = child.spawn(cmd, args, {
    stdio: "inherit"
  });

  spawn.on("exit", function (code) {
    if (code === 0) {
      callback();
    } else {
      console.log("Killing...");
      process.exit(1);
    }
  });
}
