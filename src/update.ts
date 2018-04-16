import { WorldInstancesDataUpdater } from "./world-instances/world-instances-data-updater";
import { RaidsDataUpdater } from "./raids/raids-data-updater";
import { SkirmishesDataUpdater } from "./skirmishes/skirmishes-data-updater";
import { VirtueDeedsDataUpdater } from "./virtue-deeds/virtue-deeds-data-updater";

const parsers = [
  new WorldInstancesDataUpdater(),
  new RaidsDataUpdater(),
  new SkirmishesDataUpdater(),
  new VirtueDeedsDataUpdater()
];
parsers.forEach(parser => parser.update());
