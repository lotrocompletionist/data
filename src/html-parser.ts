import { File } from "./file";
import * as cheerio from "cheerio";

export interface IHtmlPageLink {
  name: string;
  page: string;
}

export abstract class HtmlParser<T> {
  constructor(private file: File) {}

  public async parse(): Promise<T[]> {
    const $ = await this.parseHtmlFile();
    return this.parseHtml($);
  }

  protected abstract parseHtml($: CheerioStatic): T[];

  protected parsePageLink(
    $: CheerioStatic,
    element: CheerioElement
  ): IHtmlPageLink {
    const anchorElement = $("a", element).first();

    return {
      name: anchorElement.text().trim(),
      page: anchorElement.attr("href").replace("/index.php/", "")
    };
  }

  private async parseHtmlFile(): Promise<CheerioStatic> {
    const contents = await this.file.read();
    return cheerio.load(contents);
  }
}
