export interface Restaurant {
  _id?: string; // ?specifies than is optional
  name: string;
  area: string;
  price: number;
  address: string;
  city: string;
  fechaReserv?: Date;
  image_url: string;
}
