import { Instance } from "./models";
import { readCsv } from "./csv-input";
import { parseAbbreviations, parseRegion, parseLevel, parseTiers, parseGroups, parseAvailabilities, parseChallenge } from "./parser";

function parseInstance(row: any): Instance {
    return { 
        name: row.Name,
        abbreviations: parseAbbreviations(row.Abbreviation),
        region: parseRegion(row.Region),
        level: parseLevel(row.Level),
        tiers: parseTiers(row.Tiers),
        groups: parseGroups(row.Group),
        availability: parseAvailabilities(row.Available),
        prerequisites: row.Prereqs,
        challenge: parseChallenge(row.Challenge),
        cluster: row.Cluster,
        note: row.Note
    };
}

async function parseInstances(): Promise<Instance[]> {
    const csv = await readCsv('instances.csv');
    return csv.data.map(parseInstance);
}

async function saveInstances(instances: Instance[]): Promise<void> {
}

export async function updateInstances(): Promise<void> {
    const instances = await parseInstances();
    await saveInstances(instances);
}