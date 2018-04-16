import { ILevelRange, IBoss } from "../models";

export interface IRaid {
  id: number;
  name: string;
  abbreviations: string[];
  region: string;
  levelRange: ILevelRange;
  bossEncounters?: number;
  tiers: number;
  groups: string[];
  availability: string[];
  prerequisites?: string;
  challenge: string;
  cluster: string;
  note?: string;
  bosses: IBoss[];
}
