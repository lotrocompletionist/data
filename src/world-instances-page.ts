import { InstancesPage } from "./instances-page";
import { Instance } from "./instance";

export class WorldInstancesPage extends InstancesPage {
    constructor() {
        super('world-instances');
    }

    protected parseInstance($: CheerioStatic, row: CheerioElement): Instance {
        return { 
            name: this.columnLinkText($, 1, row),
            abbreviations: this.parseAbbreviations($, 2, row),
            region: this.parseRegion($, 3, row),
            level: this.parseLevel($, 4, row),
            tiers: this.parseTiers($, 5, row),
            groups: this.parseGroup($, 6, row),
            availability: this.parseAvailable($, 7, row),
            prerequisites: this.parsePrerequisites($, 8, row),
            challenge: this.parseChallenge($, 9, row),
            cluster: ''
        };
    }
}