import { IRaid } from "./raid";
import { DataUpdater } from "../data-updater";
import { RaidsCsvParser } from "./raids-csv-parser";
import { RaidsFiles } from "./raids-files";

export class RaidsDataUpdater extends DataUpdater<IRaid> {
  constructor() {
    super(RaidsFiles.typeScriptFile);
  }

  protected getData(): Promise<IRaid[]> {
    const csvParser = new RaidsCsvParser();
    return csvParser.parse();
  }
}
