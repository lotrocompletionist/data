import path = require("path");

function getPath(fileName: string, directory: string): string {
  const cwd = process.cwd();
  return path.join(cwd, directory, fileName);
}

export function getInputFilePath(fileName: string) {
  return getPath(fileName, "input");
}

export function getOutputFilePath(fileName: string) {
  return getPath(fileName, "output");
}
