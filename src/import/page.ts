import fs = require('fs');
import path = require('path');
import util = require('util');
import rp = require('request-promise');
import cheerio = require('cheerio');

const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);

export class Page {
    constructor(private name: string) {}

    public async download() {
        const html = await rp(this.url) as string;
        await writeFile(this.path, html)
    }

    public async parse() {
        const html = await readFile(this.path, { encoding: 'UTF-8' });
        return cheerio.parseHTML(html);
    }

    private get url() {
        return `https://lotro-wiki.com/index.php?title=${this.name}&printable=yes`;
    }

    private get path() {
        return path.resolve(__dirname, '..', 'pages', `${this.name}.html`);
    }
}