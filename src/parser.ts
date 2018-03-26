import { parseCsvFile } from "./input";
import { getInputFilePath, getOutputFilePath } from "./path";
import { saveAsJson } from "./output";

export abstract class Parser<T> {
  constructor(protected name: string) {}

  public async update(): Promise<void> {
    const data = await this.parse();
    await this.save(data);
  }

  protected abstract parse(): Promise<T[]>;

  private async save(instances: T[]): Promise<void> {
    await saveAsJson(getOutputFilePath(`${this.name}.ts`), instances);
  }
}
