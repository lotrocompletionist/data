export enum Challenge {
  None = "None",
  Daily = "Daily",
  Biweekly = "Biweekly"
}

export enum Availability {
  Free = "Free",
  VIP = "VIP",
  Buy = "Buy",
  QuestPack = "Quest Pack",
  Expansion = "Expansion"
}

export enum Tiers {
  None = 0,
  One = 1,
  Two = 2
}

export enum Group {
  Fellowship = "Fellowship",
  SmallFellowship = "Small Fellowship",
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
