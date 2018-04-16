import { parseHtmlFile } from "./input";
import { getInputFilePath } from "./path";

export interface IHtmlPageLink {
  name: string;
  page: string;
}

export abstract class HtmlParser<T> {
  constructor(private name: string) {}

  public async parse(): Promise<T[]> {
    const $ = await parseHtmlFile(getInputFilePath(`${this.name}.html`));
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
}
