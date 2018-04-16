import { IVirtueDeed } from "./virtue-deed";
import { DataUpdater } from "../data-updater";
import { VirtueDeedsFiles } from "./virtue-deeds-files";
import { VirtueDeedsHtmlParser } from "./virtue-deeds-html-parser";

export class VirtueDeedsDataUpdater extends DataUpdater<IVirtueDeed> {
  constructor() {
    super(VirtueDeedsFiles.typeScriptFile);
  }

  protected getData(): Promise<IVirtueDeed[]> {
    const htmlParser = new VirtueDeedsHtmlParser();
    return htmlParser.parse();
  }
}
