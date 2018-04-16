import { ISkirmish } from "./skirmish";
import { DataUpdater } from "../data-updater";
import { SkirmishesCsvParser } from "./skirmishes-csv-parser";
import { SkirmishesFiles } from "./skirmishes-files";

export class SkirmishesDataUpdater extends DataUpdater<ISkirmish> {
  constructor() {
    super(SkirmishesFiles.typeScriptFile);
  }

  protected getData(): Promise<ISkirmish[]> {
    const csvParser = new SkirmishesCsvParser();
    return csvParser.parse();
  }
}
