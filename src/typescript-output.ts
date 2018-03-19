import { read } from "./file";
import Papa from "papaparse";

export async function readCsv(fileName: string): Promise<Papa.ParseResult> {
    const contents = await read(fileName);
    return Papa.parse(contents);
}