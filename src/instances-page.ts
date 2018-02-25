import _ from "lodash";
import cheerio = require('cheerio');
import { Page } from "./page";
import { Instance, Tiers, Availability, Group, Challenge, Level } from "./instance";

export abstract class InstancesPage extends Page<Instance> {
    constructor(page: string) {
        super(page);
    }

    public async save(): Promise<void> {
        const html = await this.readHtml();
        const parsedData = this.parse(cheerio.load(html));
        await this.saveJson(parsedData);
    }

    public parse($: CheerioStatic): Instance[] {
        const rows = $("tr").next();
        return this.parseInstances(rows.toArray(), $, []);
    }

    protected parseInstances(rows: CheerioElement[], $: CheerioStatic, parsed: Instance[]): Instance[] {
        if (_.isEmpty(rows))
            return parsed;

        const cluster = this.parseCluster($, rows);

        const instances = _
            .chain(rows)
            .tail()
            .takeWhile((row, _, __) => !this.isCluster($, row))
            .map(row => this.parseInstance($, row))
            .map(instance => _.set(instance as any, 'cluster', cluster))
            .value();

        const remainder = _.drop(rows, instances.length + 1);
        return this.parseInstances(remainder, $, parsed.concat(instances));
    }

    protected abstract parseInstance($: CheerioStatic, row: CheerioElement): Instance;

    protected isCluster($: CheerioStatic, row: CheerioElement) {
        return $("th", row).length > 0;
    }

    protected parseCluster($: CheerioStatic, rows: CheerioElement[]) {
        return $("th", rows[0]).text().trim();
    }

    protected parseAbbreviations($: CheerioStatic, column: number, row: CheerioElement): string[] {
        const text = this.columnText($, column, row)
        return text.split(' or ').map(word => word.trim());
    }

    protected parseRegion($: CheerioStatic, column: number, row: CheerioElement): string {
        return this.columnText($, column, row).split('(')[0].trim();
    }

    protected parseLevel($: CheerioStatic, column: number, row: CheerioElement): Level {
        return this.parseLevelText(this.columnText($, column, row));
    }

    protected parseLevelText(text: string): Level {
        const levels = text.split('-');
        const minimum = parseInt(levels[0]);
        const maximum = levels.length > 1 ? parseInt(levels[1]) : undefined;
        return { minimum, maximum };
    }

    protected parseBossEncounters($: CheerioStatic, column: number, row: CheerioElement): number {
        return parseInt(this.columnText($, column, row).split('(')[0].trim());
    }

    protected parseTiers($: CheerioStatic, column: number, row: CheerioElement): Tiers {
        return this.parseTiersText(this.columnText($, column, row));
    }

    protected parseTiersText(text: string): Tiers {
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

    protected parseAvailable($: CheerioStatic, column: number, row: CheerioElement): Availability[] {
        const text = this.columnText($, column, row)
        return text
            .split('/')
            .map(word => word.trim())
            .filter(word => word.length > 0)
            .map(word => this.parseAvailableText(word));
    }

    protected parseAvailableText(text: string): Availability {
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

    protected parseGroup($: CheerioStatic, column: number, row: CheerioElement): Group[] {
        const text = this.columnText($, column, row)
        return text
            .split(',')
            .map(word => word.trim())
            .filter(word => word.length > 0)
            .map(word => this.parseGroupText(word));
    }

    protected parseGroupText(text: string): Group {
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

    protected parsePrerequisites($: CheerioStatic, column: number, row: CheerioElement): string {
        return this.columnLinkText($, column, row) || this.columnText($, column, row);
    }

    protected parseChallenge($: CheerioStatic, column: number, row: CheerioElement): Challenge {
        return this.parseChallengeText(this.columnText($, column, row));
    }

    protected parseChallengeText(text: string): Challenge {
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
}