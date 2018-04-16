import { ISkirmish, SkirmishType } from "./models";
import { parseLevelRange, parseBosses, parseText } from "./model-parser";
import { CsvParser } from "./csv-parser";
import { Parser } from "./parser";

const SkirmishesFileName = "skirmishes";

class SkirmishesCsvParser extends CsvParser<ISkirmish> {
  private id = 1;
  private bossId = 1;

  constructor() {
    super(SkirmishesFileName);
  }

  protected parseRow(row: any): ISkirmish {
    return {
      id: this.id++,
      name: row.Skirmish,
      levelRange: parseLevelRange(row.Level),
      faction: this.parseFaction(row.Faction),
      type: this.parseSkirmishType(row.Type),
      requirements: this.parseRequirements(row.Requirement),
      bosses: parseBosses(row.Bosses).map(name => ({ id: this.bossId++, name }))
    };
  }

  private parseSkirmishType(text: string): SkirmishType {
    switch (text.toLowerCase()) {
      case "offense":
        return SkirmishType.Offense;
      case "defense":
        return SkirmishType.Defense;
      case "survival":
        return SkirmishType.Survival;
      default:
        throw new Error(`Unsupported skirmish type: ${text}`);
    }
  }

  private parseRequirements(text: string): string[] {
    return text.split(" or ").map(word => word.trim());
  }

  private parseFaction(text: string): string | undefined {
    return text.toLowerCase() === "none" ? undefined : text.trim();
  }
}

export class SkirmishesParser extends Parser<ISkirmish> {
  private csvParser = new SkirmishesCsvParser();

  constructor() {
    super(SkirmishesFileName);
  }

  public parse(): Promise<ISkirmish[]> {
    return this.csvParser.parse();
  }
}
