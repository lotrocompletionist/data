import { IWorldInstance } from "./world-instance";
import { WorldInstancesFiles } from "./world-instances-files";
import { CsvParser } from "../csv-parser";

export class WorldInstancesCsvParser extends CsvParser<IWorldInstance> {
  private id = 1;
  private bossId = 1;

  constructor() {
    super(WorldInstancesFiles.csvFile);
  }

  protected parseRow(row: any): IWorldInstance {
    return {
      id: this.id++,
      name: row.Name,
      abbreviations: this.parseAbbreviations(row.Abbreviation),
      region: this.parseRegion(row.Region),
      levelRange: this.parseLevelRange(row.Level),
      tiers: this.parseTiers(row.Tiers),
      groups: this.parseGroups(row.Group),
      availability: this.parseAvailabilities(row.Available),
      prerequisites: this.parseText(row.Prereqs),
      challenge: this.parseChallenge(row.Challenge),
      cluster: row.Cluster,
      note: this.parseText(row.Note),
      bosses: this.parseBosses(row.Bosses).map(name => ({
        id: this.bossId++,
        name
      }))
    };
  }
}
