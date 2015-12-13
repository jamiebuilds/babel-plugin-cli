import fs from "fs";
import path from "path";
import pathExists from "path-exists";

export default function mkdir(dirname, content) {
  dirname = path.normalize(dirname);

  if (pathExists.sync(dirname)) {
    console.log("Already exists: " + dirname);
  } else {
    console.log("Creating directory: " + dirname);
    fs.mkdirSync(dirname);
  }
}
