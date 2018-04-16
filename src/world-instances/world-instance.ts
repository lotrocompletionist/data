import { ILevelRange, IBoss } from "../models";

export interface IWorldInstance {
  id: number;
  name: string;
  abbreviations: string[];
  region: string;
  levelRange: ILevelRange;
  tiers: number;
  groups: string[];
  availability: string[];
  prerequisites?: string;
  challenge: string;
  cluster: string;
  note?: string;
  bosses: IBoss[];
}
