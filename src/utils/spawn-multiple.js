import spawn from "./spawn";

export default function spawnMultiple(cmds, callback) {
  function next() {
    var cmd = cmds.shift();
    if (cmd) {
      spawn(cmd.command, cmd.args, next);
    } else {
      callback();
    }
  }

  next();
}
