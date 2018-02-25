import process = require('process');
import { WorldInstancesPage } from "./world-instances-page";
import { RaidsPage } from './raids-page';

const worldInstances = new WorldInstancesPage();
worldInstances.save();

const raids = new RaidsPage();
raids.save();