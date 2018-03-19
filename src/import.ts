import { InstancesParser } from "./instances-parser";
import { RaidsParser } from "./raids-parser";
import { SkirmishesParser } from "./skirmishes-parser";

const parsers = [
  new InstancesParser(),
  new RaidsParser(),
  new SkirmishesParser()
];
parsers.forEach(parser => parser.update());
