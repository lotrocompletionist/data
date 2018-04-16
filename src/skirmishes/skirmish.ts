import { ILevelRange, IBoss } from "../models";

export enum SkirmishType {
  Offense = "Offense",
  Defense = "Defense",
  Survival = "Survival"
}

export interface ISkirmish {
  id: number;
  name: string;
  levelRange: ILevelRange;
  faction?: string;
  type: string;
  requirements: string[];
  bosses: IBoss[];
}
