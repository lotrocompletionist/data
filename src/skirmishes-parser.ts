import { Skirmish, SkirmishType } from "./models";
import { parseLevel } from "./model-parser";
import { Parser } from "./parser";

export class SkirmishesParser extends Parser<Skirmish> {
  constructor() {
    super("skirmishes", "Skirmish");
  }

  protected parseRow(row: any): Skirmish {
    return {
      name: row.Skirmish,
      level: parseLevel(row.Level),
      faction: row.Faction,
      type: this.parseSkirmishType(row.Type),
      requirements: this.parseRequirements(row.Requirement)
    };
  }

  private parseSkirmishType(text: string): SkirmishType {
    switch (text) {
      case "Offense":
        return SkirmishType.Offense;
      case "Defense":
        return SkirmishType.Defense;
      case "Survival":
        return SkirmishType.Survival;
      default:
        throw new Error(`Unsupported skirmish type: ${text}`);
    }
  }

  private parseRequirements(text: string): string[] {
    return text.split(" or ").map(word => word.trim());
  }

  private parseSkirmish(row: any): Skirmish {
    return {
      name: row.Skirmish,
      level: parseLevel(row.Level),
      faction: row.Faction,
      type: this.parseSkirmishType(row.Type),
      requirements: this.parseRequirements(row.Requirement)
    };
  }
}
