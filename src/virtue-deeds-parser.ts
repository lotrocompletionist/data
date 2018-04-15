import { ISkirmish, SkirmishType, IVirtueDeed, IDeedsCategory, IDeed, IVirtue } from "./models";
import { parseLevel, parseBosses, parseText } from "./model-parser";
import { Parser } from "./parser";

import * as cheerio from "cheerio";
import { read } from "./file";
import { getInputFilePath } from "./path";
import { HtmlParser } from "./html-parser";
import { flatMap } from "lodash";

export class VirtueDeedsParser extends HtmlParser<IVirtueDeed> {
  private id = 1;

  constructor() {
    super("virtue-deeds");
  }

  protected parseHtml($: CheerioStatic): IVirtueDeed[] {
    return flatMap(this.getVirtueElements($), virtueElement => {
      const virtue = this.parseVirtue($, virtueElement);

      return flatMap(
        this.getCategoryElements($, virtueElement),
        categoryElement => {
          const category = this.parseDeedsCategory($, categoryElement);

          return flatMap(
            this.getDeedElements($, categoryElement),
            deedElement => {
              const level = this.parseLevel($, deedElement);
              const deed = this.parseDeed($, deedElement);

              return {
                id: this.id++,
                virtue,
                deed,
                category,
                level
              };
            }
          );
        }
      );
    });
  }

  private parseVirtue(
    $: CheerioStatic,
    headlineElement: CheerioElement
  ): IVirtue {
    return this.parsePageLink($, headlineElement);
  }

  private parseDeedsCategory(
    $: CheerioStatic,
    categoryElement: CheerioElement
  ): IDeedsCategory {
    return this.parsePageLink($, categoryElement);
  }

  private parseDeed(
    $: CheerioStatic,
    virtueDeedElement: CheerioElement
  ): IDeed {
    return this.parsePageLink($, virtueDeedElement);
  }

  private parseLevel(
    $: CheerioStatic,
    virtueDeedElement: CheerioElement
  ): number | undefined {
    const level = $(virtueDeedElement.children[0])
      .text()
      .match(/(\d+)/);
    return level === null ? undefined : parseInt(level[0]);
  }

  private getVirtueElements($: CheerioStatic): CheerioElement[] {
    return $("span.mw-headline")
      .filter((_, virtueElement) => $(virtueElement).find("a").length > 0)
      .toArray();
  }

  private getCategoryElements(
    $: CheerioStatic,
    headlineElement: CheerioElement
  ): CheerioElement[] {
    return $(headlineElement)
      .closest("h2")
      .next()
      .next()
      .children("li")
      .toArray();
  }

  private getDeedElements(
    $: CheerioStatic,
    regionElement: CheerioElement
  ): CheerioElement[] {
    return $(regionElement)
      .find("li")
      .filter((_, regionElement) => $(regionElement).find("a").length > 0)
      .toArray();
  }
}
