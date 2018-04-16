import { File } from "../file";

export class WorldInstancesFiles {
  public static csvFile = new File("world-instances.csv", "world-instances");
  public static typeScriptFile = new File(
    "world-instances.ts",
    "world-instances"
  );
}
