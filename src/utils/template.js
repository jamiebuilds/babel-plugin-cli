import fs from "fs";
import path from "path";

export default function template(name, data = {}) {
  var source = fs.readFileSync(path.join(__dirname, "../templates", name), "utf8");

  source = source.replace(/[A-Z_]+/g, function (key) {
    return data[key] === undefined ? key : data[key];
  });

  return source;
}
