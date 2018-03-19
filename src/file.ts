import fs = require('fs');
import util = require('util');
import path = require('path');

function getPath(fileName: string, directory: string): string {
    const cwd = process.cwd();
    return path.join(cwd, directory, fileName);
}

export function read(fileName: string): Promise<string> {
    const readFile = util.promisify(fs.readFile);
    return readFile(getPath(fileName, 'input'), { encoding: 'UTF-8'} );
}

export function write(fileName: string, data: any): Promise<void> {
    const writeFile = util.promisify(fs.writeFile);
    return writeFile(getPath(fileName, 'output'), data);
}