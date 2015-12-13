import parseAuthor from "parse-author";
import execMaybe from "./exec-maybe";

export default function getAuthor(inputString) {
  const parsed = parseAuthor(inputString);
  const gitName = execMaybe("git config --get user.name").trim();
  const gitEmail = execMaybe("git config --get user.email").trim();

  let name, email, url, formatted;

  if (parsed.name.length) {
    name = parsed.name;
  } else if (gitName.length) {
    name = gitName;
  }

  if (parsed.email.length) {
    email = parsed.email;
  } else if (gitEmail.length) {
    email = gitEmail;
  }

  if (parsed.url.length) {
    url = parsed.url;
  }

  if (name) {
    formatted = name;
    if (email) formatted += ` <${email}>`;
    if (url) formatted += ` (${url})`;
  }

  return { name, email, url, formatted };
}
