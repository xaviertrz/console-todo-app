import fs from "fs";

const path = "./db/data.json";

export function saveFile(data) {
  fs.writeFileSync(path, JSON.stringify(data));
}

export function readDB() {
  if (!fs.existsSync(path)) {
    return null;
  }

  const info = fs.readFileSync(path, { encoding: "utf-8" });
  const data = JSON.parse(info);
  return data;
}
