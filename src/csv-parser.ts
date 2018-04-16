import Papa from "papaparse";
import _ from "lodash";
import { Tiers, Availability, Group, Challenge, ILevelRange } from "./models";
import { File } from "./file";

export abstract class CsvParser<T> {
  constructor(private file: File) {}

  public async parse(): Promise<T[]> {
    const csv = await this.parseCsvFile();
    return csv.data.map(row => this.parseRow(row));
  }

  protected abstract parseRow(row: any): T;

  private async parseCsvFile(): Promise<Papa.ParseResult> {
    const contents = await this.file.read();
    return Papa.parse(contents, {
      header: true
    });
  }

  protected parseAbbreviations(text: string): string[] {
    return text.split(" or ").map(word => word.trim());
  }

  protected parseRegion(text: string): string {
    return text.split("(")[0].trim();
  }

  protected parseLevel(text: string): number {
    return parseInt(text);
  }

  protected parseLevelRange(text: string): ILevelRange {
    const levels = text.split("-");
    const minimum = this.parseLevel(levels[0]);
    const maximum = levels.length > 1 ? this.parseLevel(levels[1]) : undefined;
    return { minimum, maximum };
  }

  protected parseChallenge(text: string): Challenge {
    switch (text.toLowerCase()) {
      case "daily":
        return Challenge.Daily;
      case "biweekly":
        return Challenge.Biweekly;
      case "?":
      case "-":
      case "":
        return Challenge.None;
      default:
        throw new Error(`Unsupported challenge: ${text}`);
    }
  }

  protected parseTiers(text: string): Tiers {
    switch (text) {
      case "1":
        return Tiers.One;
      case "2":
        return Tiers.Two;
      case "":
        return Tiers.None;
      default:
        throw new Error(`Unsupported tiers: ${text}`);
    }
  }

  protected parseAvailabilities(text: string): Availability[] {
    function parseAvailability(text: string): Availability {
      switch (text.toLowerCase()) {
        case "free":
          return Availability.Free;
        case "vip":
          return Availability.VIP;
        case "buy":
          return Availability.Buy;
        case "qp":
          return Availability.QuestPack;
        case "exp":
          return Availability.Expansion;
        default:
          throw new Error(`Unsupported availability: ${text}`);
      }
    }

    return text
      .split("/")
      .map(word => word.trim())
      .filter(word => word.length > 0)
      .map(parseAvailability);
  }

  protected parseGroups(text: string): Group[] {
    function parseGroup(text: string): Group {
      switch (text.toLowerCase()) {
        case "small fellowship":
        case "small fellowship (three)":
          return Group.SmallFellowship;
        case "fellowship":
        case "fellowship (six)":
          return Group.Fellowship;
        case "raid":
        case "raid (twelve)":
          return Group.Raid;
        case "solo/duo":
          return Group.SoloDuo;
        default:
          throw new Error(`Unsupported group: ${text}`);
      }
    }

    return text
      .split(",")
      .map(word => word.trim())
      .filter(word => word.length > 0)
      .map(parseGroup);
  }

  protected parseBosses(text: string): string[] {
    return text
      .split(";")
      .map(word => word.trim())
      .filter(word => word.length > 0);
  }

  protected parseText(text: string): string | undefined {
    return text && text.trim().length > 0 ? text.trim() : undefined;
  }
}
