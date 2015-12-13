import child from "child_process";

export default function execMaybe(cmd) {
  try {
    return child.execSync(cmd).toString();
  } catch (err) {
    return "";
  }
}
