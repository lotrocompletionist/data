import { parseHtmlFile } from "./input";
import { getInputFilePath } from "./path";
import { Parser } from "./parser";

export interface IPageLink {
  name: string;
  page: string;
}

export abstract class HtmlParser<T> extends Parser<T> {
  constructor(name: string) {
    super(name);
  }

  protected abstract parseHtml($: CheerioStatic): T[];

  protected async parse(): Promise<T[]> {
    const $ = await parseHtmlFile(getInputFilePath(`${this.name}.html`));
    return this.parseHtml($);
  }

  protected parsePageLink(
    $: CheerioStatic,
    element: CheerioElement
  ): IPageLink {
    const anchorElement = $("a", element).first();

    return {
      name: anchorElement.text().trim(),
      page: anchorElement.attr("href").replace("/index.php/", "")
    };
  }
}
