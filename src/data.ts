import fs = require('fs');
import util = require('util');
import path = require('path');

function getPath(fileName: string): string {
    const cwd = process.cwd();
    return path.join(cwd, 'data', fileName);
}

export async function readData(fileName: string): Promise<string> {
    const readFile = util.promisify(fs.readFile);
    return readFile(getPath(fileName), { encoding: 'UTF-8'} );
}

export async function writeData(fileName: string, data: any): Promise<void> {
    const writeFile = util.promisify(fs.writeFile);
    return writeFile(getPath(fileName), data);
}