import { WorldInstancesParser } from "./world-instances-parser";
import { RaidsParser } from "./raids-parser";
import { SkirmishesParser } from "./skirmishes-parser";
import { VirtueDeedsParser } from "./virtue-deeds-parser";

const parsers = [
  new WorldInstancesParser(),
  new RaidsParser(),
  new SkirmishesParser(),
  new VirtueDeedsParser()
];
parsers.forEach(parser => parser.update());
