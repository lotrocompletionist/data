import { read } from "./file";
import Papa from "papaparse";
import * as cheerio from "cheerio";

export async function parseCsvFile(
  fileName: string
): Promise<Papa.ParseResult> {
  const contents = await read(fileName);
  return Papa.parse(contents, {
    header: true
  });
}

export async function parseHtmlFile(fileName: string): Promise<CheerioStatic> {
  const contents = await read(fileName);
  return cheerio.load(contents);
}
