const { readFile, writeFile } = require("fs/promises");
const path = require("path");

let data = null;

async function loadData() {
  if (!data) {
    const filePath = path.join(__dirname, "../task.json");
    data = JSON.parse(await readFile(filePath, "utf-8"));
  }
  return data;
}

// If you want persistence (optional)
async function saveData() {
  const filePath = path.join(__dirname, "../task.json");
  await writeFile(filePath, JSON.stringify(data, null, 2));
}

function getData() {
  return data;
}

module.exports = {
  loadData,
  saveData,
  getData,
};
