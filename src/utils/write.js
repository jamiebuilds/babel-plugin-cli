import fs from "fs";
import path from "path";
import pathExists from "path-exists";

export default function write(filename, content) {
  filename = path.normalize(filename);

  if (pathExists.sync(filename)) {
    console.log("Already exists: " + filename);
  } else {
    console.log("Creating file: " + filename);
    fs.writeFileSync(filename, content);
  }
}
