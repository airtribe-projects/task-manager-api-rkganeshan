import { readFile, writeFile } from "fs/promises";

let data = null;

export async function loadData() {
  if (!data) {
    data = JSON.parse(await readFile(new URL("../task.json", import.meta.url)));
  }
  return data;
}

// If you want persistence (optional)
export async function saveData() {
  await writeFile(
    new URL("../task.json", import.meta.url),
    JSON.stringify(data, null, 2)
  );
}

export function getData() {
  return data;
}
