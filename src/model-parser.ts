import _ from "lodash";
import {
  Instance,
  Tiers,
  Availability,
  Group,
  Challenge,
  Level
} from "./models";

export function parseAbbreviations(text: string): string[] {
  return text.split(" or ").map(word => word.trim());
}

export function parseRegion(text: string): string {
  return text.split("(")[0].trim();
}

export function parseLevel(text: string): Level {
  const levels = text.split("-");
  const minimum = parseInt(levels[0]);
  const maximum = levels.length > 1 ? parseInt(levels[1]) : undefined;
  return { minimum, maximum };
}

export function parseChallenge(text: string): Challenge {
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

export function parseTiers(text: string): Tiers {
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

export function parseAvailabilities(text: string): Availability[] {
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

export function parseGroups(text: string): Group[] {
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
