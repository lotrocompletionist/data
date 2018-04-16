import { IRaid } from "./raid";
import { RaidsFiles } from "./raids-files";
import { CsvParser } from "../csv-parser";

export class RaidsCsvParser extends CsvParser<IRaid> {
  private id = 1;
  private bossId = 1;

  constructor() {
    super(RaidsFiles.csvFile);
  }

  protected parseRow(row: any): IRaid {
    return {
      id: this.id++,
      name: row.Name,
      abbreviations: this.parseAbbreviations(row.Abbreviation),
      region: this.parseRegion(row.Region),
      levelRange: this.parseLevelRange(row.Level),
      bossEncounters: this.parseBossEncounters(row.BossEncounters),
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

  private parseBossEncounters(text: string): number {
    return parseInt(text);
  }
}
