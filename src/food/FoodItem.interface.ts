export interface FoodItem {
  id: number;
  title: string;
  expiryDate: string;
  description: string;
  latitude: number;
  longitude: number;
  address: string;
  pictures: { url: string; public_id: string }[];
  owner: number;
}
