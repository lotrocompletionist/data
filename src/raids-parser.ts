import { Raid } from "./models";
import {
  parseAbbreviations,
  parseRegion,
  parseLevel,
  parseTiers,
  parseGroups,
  parseAvailabilities,
  parseChallenge,
  parseBosses,
  parseText
} from "./model-parser";
import { Parser } from "./parser";

export class RaidsParser extends Parser<Raid> {
  private id = 1;
  private bossId = 1;

  constructor() {
    super("raids", "Raid");
  }

  protected parseRow(row: any): Raid {
    return {
      id: this.id++,
      name: row.Name,
      abbreviations: parseAbbreviations(row.Abbreviation),
      region: parseRegion(row.Region),
      level: parseLevel(row.Level),
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
