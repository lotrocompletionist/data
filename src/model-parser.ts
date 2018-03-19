import _ from "lodash";
import { Instance, Tiers, Availability, Group, Challenge, Level } from "./models";

export function parseAbbreviations(text: string): string[] {
    return text.split(' or ').map(word => word.trim());
}

export function parseRegion(text: string): string {
    return text.split('(')[0].trim();
}

export function parseLevel(text: string): Level {
    const levels = text.split('-');
    const minimum = parseInt(levels[0]);
    const maximum = levels.length > 1 ? parseInt(levels[1]) : undefined;
    return { minimum, maximum };
}

export function parseChallenge(text: string): Challenge {
    switch (text) {
        case "Daily":
            return Challenge.Daily;
        case "Biweekly":
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
        switch (text) {
            case "Free":
                return Availability.Free;
            case "VIP":
                return Availability.VIP;
            case "Buy":
                return Availability.Buy;
            case "QP":
                return Availability.QuestPack;
            case "Exp":
                return Availability.Expansion;
            default:
                throw new Error(`Unsupported availability: ${text}`);
        }
    }

    return text
        .split('/')
        .map(word => word.trim())
        .filter(word => word.length > 0)
        .map(parseAvailability);
}

export function parseGroups(text: string): Group[] {
    function parseGroup(text: string): Group {
        switch (text) {
            case "Small Fellowship":
            case "Small Fellowship (Three)":
                return Group.SmallFellowship;
            case "Fellowship":
            case "Fellowship (Six)":
                return Group.Fellowship;
            case "Raid":
            case "Raid (Twelve)":
                return Group.Raid;
            case "Solo/Duo":
                return Group.SoloDuo;
            default:
                throw new Error(`Unsupported group: ${text}`);
        }
    }

    return text
        .split(',')
        .map(word => word.trim())
        .filter(word => word.length > 0)
        .map(parseGroup);
}