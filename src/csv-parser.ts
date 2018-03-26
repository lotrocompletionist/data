import { parseCsvFile } from "./input";
import { getInputFilePath } from "./path";
import { Parser } from "./parser";

export abstract class CsvParser<T> extends Parser<T> {
  constructor(name: string) {
    super(name);
  }

  protected abstract parseRow(row: any): T;

  protected async parse(): Promise<T[]> {
    const csv = await parseCsvFile(getInputFilePath(`${this.name}.csv`));
    return csv.data.map(row => this.parseRow(row));
  }
}
