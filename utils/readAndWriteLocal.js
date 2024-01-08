import { readFile, writeFile } from "node:fs/promises";

async function readFromLocalFile(path) {
  const data = await readFile(path, "utf-8");
  return JSON.parse(data);
}

async function writeToLocalFile(path, data) {
  await writeFile(path, JSON.stringify(data, null, 2), "utf-8");
}

export { readFromLocalFile, writeToLocalFile };
