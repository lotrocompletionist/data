import { IWorldInstance } from "./world-instance";
import { DataUpdater } from "../data-updater";
import { WorldInstancesFiles } from "./world-instances-files";
import { WorldInstancesCsvParser } from "./world-instances-csv-parser";

export class WorldInstancesDataUpdater extends DataUpdater<IWorldInstance> {
  constructor() {
    super(WorldInstancesFiles.typeScriptFile);
  }

  protected getData(): Promise<IWorldInstance[]> {
    const csvParser = new WorldInstancesCsvParser();
    return csvParser.parse();
  }
}
