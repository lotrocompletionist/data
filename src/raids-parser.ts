import { Raid } from "./models";
import { readCsv } from "./csv-input";
import { parseAbbreviations, parseRegion, parseLevel, parseTiers, parseGroups, parseAvailabilities, parseChallenge } from "./parser";

function parseBossEncounters(text: string): number {
    return parseInt(text);
}

function parseRaid(row: any): Raid {
    return { 
        name: row.Name,
        abbreviations: parseAbbreviations(row.Abbreviation),
        region: parseRegion(row.Region),
        level: parseLevel(row.Level),
        bossEncounters: parseBossEncounters(row.BossEncounters),
        tiers: parseTiers(row.Tiers),
        groups: parseGroups(row.Group),
        availability: parseAvailabilities(row.Available),
        prerequisites: row.Prereqs,
        challenge: parseChallenge(row.Challenge),
        cluster: row.Cluster,
        note: row.Note
    };
}

async function parseRaids(): Promise<Raid[]> {
    const csv = await readCsv('raids.csv');
    return csv.data.map(parseRaid);
}

async function saveRaids(raids: Raid[]): Promise<void> {
}

export async function updateRaids(): Promise<void> {
    const raids = await parseRaids();
    await saveRaids(raids);
}
