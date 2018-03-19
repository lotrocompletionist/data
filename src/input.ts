import { read } from "./file";
import Papa from "papaparse";

export async function parseCsvFile(
  fileName: string
): Promise<Papa.ParseResult> {
  const contents = await read(fileName);
  return Papa.parse(contents, {
    header: true
  });
}
