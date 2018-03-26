export enum Challenge {
  None = "None",
  Daily = "Daily",
  Biweekly = "Biweekly"
}

export enum Availability {
  Free = "Free",
  VIP = "VIP",
  Buy = "Buy",
  QuestPack = "QuestPack",
  Expansion = "Expansion"
}

export enum Tiers {
  None = 0,
  One = 1,
  Two = 2
}

export enum Group {
  Fellowship = "Fellowship",
  SmallFellowship = "SmallFellowship",
  SoloDuo = "Solo/Duo",
  Raid = "Raid"
}

export interface ILevelRange {
  minimum: number;
  maximum?: number;
}

export interface IBoss {
  id: number;
  name: string;
}

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

export interface IVirtueDeed {
  id: number;
  virtue: string;
  deed: string;
  region: string;
  level?: number;
}
