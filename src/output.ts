import { write } from "./file";
import * as prettier from "prettier";

export async function saveAsJson(fileName: string, data: any): Promise<void> {
    const serializedData = JSON.stringify(data);
    const formattedData = prettier.format(serializedData);
    await write(fileName, formattedData);
}