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

export interface Level {
  minimum: number;
  maximum?: number;
}

export interface Instance {
  name: string;
  abbreviations: string[];
  region: string;
  level: Level;
  tiers: number;
  groups: string[];
  availability: string[];
  prerequisites?: string;
  challenge: string;
  cluster: string;
  note?: string;
  bosses: string[];
}

export interface Raid {
  name: string;
  abbreviations: string[];
  region: string;
  level: Level;
  bossEncounters?: number;
  tiers: number;
  groups: string[];
  availability: string[];
  prerequisites?: string;
  challenge: string;
  cluster: string;
  note?: string;
  bosses: string[];
}

export enum SkirmishType {
  Offense = "Offense",
  Defense = "Defense",
  Survival = "Survival"
}

export interface Skirmish {
  name: string;
  level: Level;
  faction?: string;
  type: string;
  requirements: string[];
  bosses: string[];
}
