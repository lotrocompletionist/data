import { Raid } from "./models";
import {
  parseAbbreviations,
  parseRegion,
  parseLevel,
  parseTiers,
  parseGroups,
  parseAvailabilities,
  parseChallenge,
  parseBosses
} from "./model-parser";
import { Parser } from "./parser";

export class RaidsParser extends Parser<Raid> {
  constructor() {
    super("raids", "Raid");
  }

  protected parseRow(row: any): Raid {
    return {
      name: row.Name,
      abbreviations: parseAbbreviations(row.Abbreviation),
      region: parseRegion(row.Region),
      level: parseLevel(row.Level),
      bossEncounters: this.parseBossEncounters(row.BossEncounters),
      tiers: parseTiers(row.Tiers),
      groups: parseGroups(row.Group),
      availability: parseAvailabilities(row.Available),
      prerequisites: row.Prereqs,
      challenge: parseChallenge(row.Challenge),
      cluster: row.Cluster,
      note: row.Note,
      bosses: parseBosses(row.Bosses)
    };
  }

  private parseBossEncounters(text: string): number {
    return parseInt(text);
  }
}
