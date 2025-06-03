// export interface ProductPropsI {
//   product: ProductI;
// }

export interface ProductI {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  brand: string;
  category: string;
  experience?: string;
  countInStock: number;
  rating: number;
  numReviews: number;
}

export interface CreateProductDataI {
  // _id: Omitted (auto-generated),
  // rating (defaults to 0),
  // numReviews (defaults to 0)
  name: string;
  description: string;
  image?: string;
  price: number;
  brand: string;
  category: string;
  experience?: string;
  countInStock: number;
}

export interface UseProductsReturnI {
  products: ProductI[];
  loading: boolean;
  error: string | null;
  // TODO: implement missing functions
  fetchProduct: (id: string) => Promise<ProductI>;
  createProduct: (productData: CreateProductDataI) => Promise<ProductI>;
  /* 
  updateProduct: (id: string, productData: UpdateProductData) => Promise<Product>;
  deleteProduct: (id: string) => Promise<void>;
  refetch: () => Promise<void>; 
  */
}
