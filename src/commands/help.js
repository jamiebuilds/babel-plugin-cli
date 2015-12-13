export default function help() {
  console.log([
    "Usage",
    "  $ babel-plugin [command]",
    "",
    "Commands",
    "  init    [i]  Create a new plugin in the current directory",
    "  build   [b]  Build plugin",
    "  test    [t]  Run plugin tests",
    "  publish [p]  Publish plugin to npm",
    "  help    [h]  This"
  ].join("\n"));
}
