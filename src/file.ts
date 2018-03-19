import fs = require("fs");
import util = require("util");

export function read(fileName: string): Promise<string> {
  const readFile = util.promisify(fs.readFile);
  return readFile(fileName, { encoding: "UTF-8" });
}

export function write(fileName: string, data: any): Promise<void> {
  const writeFile = util.promisify(fs.writeFile);
  return writeFile(fileName, data);
}
