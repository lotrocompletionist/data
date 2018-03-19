import { Skirmish, SkirmishType } from "./models";
import { readCsv } from "./csv-input";
import { parseLevel } from "./parser";

function parseSkirmishType(text: string): SkirmishType {
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

function parseRequirements(text: string): string[] {
    return text.split(' or ').map(word => word.trim());
}

function parseSkirmish(row: any): Skirmish {
    return { 
        name: row.Skirmish,
        level: parseLevel(row.Level),
        faction: row.Faction,
        type: parseSkirmishType(row.Type),
        requirements: parseRequirements(row.Requirement)
    };
}

async function parseSkirmishes(): Promise<Skirmish[]> {
    const csv = await readCsv('skirmishes.csv');
    return csv.data.map(parseSkirmish);
}

async function saveSkirmishes(skirmishes: Skirmish[]): Promise<void> {
}

export async function updateSkirmishes(): Promise<void> {
    const skirmishes = await parseSkirmishes();
    await saveSkirmishes(skirmishes);
}