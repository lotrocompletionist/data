export interface IDeed {
  name: string;
  page: string;
}

export interface IDeedsCategory {
  name: string;
  page: string;
}

export interface IVirtue {
  name: string;
  page: string;
}

export interface IVirtueDeed {
  id: number;
  virtue: IVirtue;
  deed: IDeed;
  category: IDeedsCategory;
  level?: number;
}
