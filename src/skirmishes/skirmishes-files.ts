import { File } from "../file";

export class SkirmishesFiles {
  public static csvFile = new File("skirmishes.csv", "skirmishes");
  public static bossesCsvFile = new File("skirmishes-bosses.ts", "skirmishes");
  public static typeScriptFile = new File("skirmishes.ts", "skirmishes");
}
