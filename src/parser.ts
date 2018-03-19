import { parseCsvFile } from "./input";
import { getInputFilePath, getOutputFilePath } from "./path";
import { saveAsJson } from "./output";

export abstract class Parser<T> {
    constructor(private name: string, private typeName: string) {}
    
    public async update(): Promise<void> {
        const data = await this.parse();
        await this.save(data);
    }

    protected abstract parseRow(row: any): T;
    
    private async parse(): Promise<T[]> {
        const csv = await parseCsvFile(getInputFilePath(`${this.name}.csv`));
        return csv.data.map(row => this.parseRow(row));
    }
    
    private async save(instances: T[]): Promise<void> {
        await saveAsJson(getOutputFilePath(`${this.name}.ts`), instances);
    }
}