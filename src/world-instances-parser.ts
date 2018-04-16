import { IWorldInstance } from "./models";
import {
  parseAbbreviations,
  parseRegion,
  parseLevelRange,
  parseTiers,
  parseGroups,
  parseAvailabilities,
  parseChallenge,
  parseBosses,
  parseText
} from "./model-parser";
import { CsvParser } from "./csv-parser";
import { Parser } from "./parser";

const WorldInstancesFileName = "world-instances";

class WorldInstancesCsvParser extends CsvParser<IWorldInstance> {
  private id = 1;
  private bossId = 1;

  constructor() {
    super(WorldInstancesFileName);
  }

  protected parseRow(row: any): IWorldInstance {
    return {
      id: this.id++,
      name: row.Name,
      abbreviations: parseAbbreviations(row.Abbreviation),
      region: parseRegion(row.Region),
      levelRange: parseLevelRange(row.Level),
      tiers: parseTiers(row.Tiers),
      groups: parseGroups(row.Group),
      availability: parseAvailabilities(row.Available),
      prerequisites: parseText(row.Prereqs),
      challenge: parseChallenge(row.Challenge),
      cluster: row.Cluster,
      note: parseText(row.Note),
      bosses: parseBosses(row.Bosses).map(name => ({ id: this.bossId++, name }))
    };
  }
}

export class WorldInstancesParser extends Parser<IWorldInstance> {
  private csvParser = new WorldInstancesCsvParser();

  constructor() {
    super(WorldInstancesFileName);
  }

  public parse(): Promise<IWorldInstance[]> {
    return this.csvParser.parse();
  }
}
