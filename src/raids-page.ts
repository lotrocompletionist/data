import { InstancesPage } from "./instances-page";
import { Instance } from "./instance";

export class RaidsPage extends InstancesPage {
    constructor() {
        super('raids');
    }

    protected parseInstance($: CheerioStatic, row: CheerioElement): Instance {
        return { 
            name: this.columnLinkText($, 1, row),
            abbreviations: this.parseAbbreviations($, 2, row),
            region: this.parseRegion($, 3, row),
            level: this.parseLevel($, 4, row),
            bossEncounters: this.parseBossEncounters($, 5, row),
            tiers: this.parseTiers($, 6, row),
            groups: this.parseGroup($, 7, row),
            availability: this.parseAvailable($, 8, row),
            prerequisites: this.parsePrerequisites($, 9, row),
            challenge: this.parseChallenge($, 10, row),
            cluster: ''
        };
    }
}