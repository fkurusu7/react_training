export interface ProductI {
  _id: string;
  name: string;
  image: string;
  description: string;
  experience?: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
}

export interface ProductPropsI {
  product: ProductI;
}
