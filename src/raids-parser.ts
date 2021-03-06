import { IRaid } from "./models";
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

export class RaidsParser extends CsvParser<IRaid> {
  private id = 1;
  private bossId = 1;

  constructor() {
    super("raids");
  }

  protected parseRow(row: any): IRaid {
    return {
      id: this.id++,
      name: row.Name,
      abbreviations: parseAbbreviations(row.Abbreviation),
      region: parseRegion(row.Region),
      levelRange: parseLevelRange(row.Level),
      bossEncounters: this.parseBossEncounters(row.BossEncounters),
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

  private parseBossEncounters(text: string): number {
    return parseInt(text);
  }
}
