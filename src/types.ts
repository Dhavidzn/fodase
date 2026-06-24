export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  items: string[];
}

export interface DifferentialItem {
  id: string;
  title: string;
  description: string;
}

export interface SectorItem {
  id: string;
  name: string;
  iconName: string;
  description: string;
}

export interface CaseItem {
  id: string;
  title: string;
  category: string;
  description: string;
}
