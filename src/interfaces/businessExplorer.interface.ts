export interface BusinessCategory {
  name: string;
  count: number;
  subCategories?: {
    name: string;
    count: number;
  }[];
}

export interface AreaStatistics {
  id: string;
  name: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  totalBusinesses: number;
  categories: BusinessCategory[];
}

export interface DubaiArea {
  id: string;
  name: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  description: string;
}
