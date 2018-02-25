import _ = require("lodash");
import cheerio = require('cheerio');
import { readData, writeData } from "./data";

export abstract class Page<T> {
    constructor(private page: string) {}

    public async save(): Promise<void> {
        const html = await this.readHtml();
        const parsedData = this.parse(cheerio.load(html));
        await this.saveJson(parsedData);
    }

    public abstract parse($: CheerioStatic): T[];

    protected columnText($: CheerioStatic, column: number, row: CheerioElement): string {
        return $(`td:nth-child(${column})`, row).text().trim();
    }

    protected columnLinkText($: CheerioStatic, column: number, row: CheerioElement): string {
        return $(`td:nth-child(${column}) a`, row).first().text().trim();
    }

    protected readHtml(): Promise<string> {
        return readData(`${this.page}.html`);
    }

    protected saveJson(data: T[]) {
        writeData(`${this.page}.json`, JSON.stringify(data, null, 2));
    }
}