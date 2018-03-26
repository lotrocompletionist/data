import { ISkirmish, SkirmishType, IVirtueDeed } from "./models";
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
        this.getRegionElements($, virtueElement),
        regionElement => {
          const region = this.parseRegion($, regionElement);

          return flatMap(
            this.getDeedElements($, regionElement),
            deedElement => {
              const level = this.parseLevel($, deedElement);
              const deed = this.parseDeed($, deedElement);

              return {
                id: this.id++,
                virtue,
                deed,
                region,
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
  ): string {
    return $("a span", headlineElement).text();
  }

  private parseRegion($: CheerioStatic, regionElement: CheerioElement): string {
    return $("a", regionElement)
      .first()
      .text()
      .replace(/ deeds/i, "");
  }

  private parseDeed(
    $: CheerioStatic,
    virtueDeedElement: CheerioElement
  ): string {
    return $("a", virtueDeedElement)
      .first()
      .text();
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

  private getRegionElements(
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
