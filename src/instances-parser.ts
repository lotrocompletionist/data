import { Instance } from "./models";
import { parseAbbreviations, parseRegion, parseLevel, parseTiers, parseGroups, parseAvailabilities, parseChallenge } from "./model-parser";
import { Parser } from "./parser";

export class InstancesParser extends Parser<Instance> {
    constructor() {
        super('instances', 'Instance');
    }

    protected parseRow(row: any): Instance {
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
}