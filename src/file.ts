import fs = require("fs");
import path = require("path");
import util = require("util");

export class File {
  private path: string;

  constructor(fileName: string, directory: string) {
    this.path = this.getFilePath(fileName, directory);
  }

  public read(): Promise<string> {
    const readFile = util.promisify(fs.readFile);
    return readFile(this.path, { encoding: "UTF-8" });
  }

  public write(data: any): Promise<void> {
    const writeFile = util.promisify(fs.writeFile);
    return writeFile(this.path, data);
  }

  private getFilePath(fileName: string, directory: string): string {
    const cwd = process.cwd();
    return path.join(cwd, "src", directory, fileName);
  }
}
