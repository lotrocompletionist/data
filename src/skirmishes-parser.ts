import { Skirmish, SkirmishType } from "./models";
import { parseLevel, parseBosses, parseText } from "./model-parser";
import { Parser } from "./parser";

export class SkirmishesParser extends Parser<Skirmish> {
  private id = 1;
  private bossId = 1;

  constructor() {
    super("skirmishes", "Skirmish");
  }

  protected parseRow(row: any): Skirmish {
    return {
      id: this.id++,
      name: row.Skirmish,
      level: parseLevel(row.Level),
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
