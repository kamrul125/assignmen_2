export interface Vehicle {
  id?: number;
  name: string;
  type: string;
  price_per_day: number;
  availability?: boolean;
  created_at?: Date;
}
