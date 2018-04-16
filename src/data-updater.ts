import { File } from "./file";
import * as prettier from "prettier";

export abstract class DataUpdater<T> {
  constructor(private file: File) {}

  public async update(): Promise<void> {
    const data = await this.getData();
    return this.save(data);
  }

  protected abstract getData(): Promise<T[]>;

  private save(data: T[]): Promise<void> {
    const serializedData = JSON.stringify(data);
    const formattedData = prettier.format(serializedData);
    return this.file.write(formattedData);
  }
}
