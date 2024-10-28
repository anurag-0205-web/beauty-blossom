export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  features: string[];
  size: string;
  category: string;
  reviews: {
    rating: number;
    count: number;
  };
  stock: boolean;
  provider: 'A' | 'B' | 'G';
}

export interface DeliveryProvider {
  code: 'A' | 'B' | 'G';
  name: string;
  cutoffTime?: string;
  minDays: number;
  maxDays: number;
}