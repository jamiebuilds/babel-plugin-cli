import spawn from "../utils/spawn";

export default function build() {
  spawn("babel", ["src", "--out-dir", "lib", "--copy-files"], process.exit);
}
