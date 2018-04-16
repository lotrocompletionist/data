import { parseCsvFile } from "./input";
import { getInputFilePath } from "./path";

export abstract class CsvParser<T> {
  constructor(private name: string) {}

  public async parse(): Promise<T[]> {
    const csv = await parseCsvFile(getInputFilePath(`${this.name}.csv`));
    return csv.data.map(row => this.parseRow(row));
  }

  protected abstract parseRow(row: any): T;
}
