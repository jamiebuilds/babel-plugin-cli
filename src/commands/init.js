import path from "path";
import readline from "readline";
import fs from "fs";
import series from "run-series";
import getAuthor from "../utils/get-author";
import execMaybe from "../utils/exec-maybe";
import template from "../utils/template";
import mkdir from "../utils/mkdir";
import write from "../utils/write";

const BABEL_PLUGIN_PREFIX = "babel-plugin-";

export default function init() {
  let name = path.basename(process.cwd());
  let repo = execMaybe("git config --get remote.origin.url").trim().match(/git@github.com:(.*?).git/);

  if (name.indexOf(BABEL_PLUGIN_PREFIX) === 0) {
    name = name.slice(BABEL_PLUGIN_PREFIX.length);
  }

  if (repo) {
    repo = repo[1];
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  function askDescription(cb) {
    rl.question("Description (optional): ", d => cb(null, d));
  }

  function askRepository(cb) {
    if (repo) {
      cb(null, repo);
    } else {
      rl.question("GitHub Repository (eg. sebmck/babel-plugin-foobar) (optional): ", r => cb(null, r));
    }
  }

  function askAuthor(cb) {
    rl.question("Author (eg. James Kyle <me@thejameskyle.com>) (optional): ", a => cb(null, a));
  }

  series([
    askDescription,
    askRepository,
    askAuthor
  ], (err, res) => {
    rl.close();
    if (err) {
      console.error(err);
    } else {
      createFiles(name, ...res);
    }
  });
}

function createFiles(name, description, repo, author) {
  author = getAuthor(author);

  const templateData = {
    NAME: name,
    FULL_NAME: BABEL_PLUGIN_PREFIX + name,
    DESCRIPTION: description,
    AUTHOR_NAME: author.name,
    AUTHOR_EMAIL: author.email,
    AUTHOR_URL: author.url
  };

  const pkg = {
    name: templateData.FULL_NAME,
    version: "1.0.0",
    description: templateData.DESCRIPTION,
    repository: repo || undefined,
    license: "MIT",
    main: "lib/index.js",
    author: author.formatted,

    devDependencies: {
      "babel-core": "^6.3.17"
    },

    scripts: {
      build: "babel-plugin build",
      push:  "babel-plugin publish",
      test:  "babel-plugin test"
    },

    keywords: ["babel-plugin"]
  };

  write("package.json", JSON.stringify(pkg, null, "  ") + "\n");

  write(".npmignore", "node_modules\n*.log\nsrc\n");
  write(".gitignore", "node_modules\n*.log\nlib\n");
  write("README.md", template("readme", templateData));

  write("LICENSE", template("license", {
    YEAR: new Date().getFullYear(),
    AUTHOR_NAME: author.name,
    AUTHOR_EMAIL: author.email
  }));

  mkdir("src");
  write("src/index.js", template("plugin", templateData));
  mkdir("test");
  mkdir("test/fixtures");
}
