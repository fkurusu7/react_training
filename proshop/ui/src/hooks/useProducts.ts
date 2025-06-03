import { useCallback, useEffect, useState } from 'react';
import { productsAPI } from '../services/products.api';
import type {
  CreateProductDataI,
  ProductI,
  UseProductsReturnI,
} from '../types/product';

export const useProducts = (): UseProductsReturnI => {
  const [products, setProducts] = useState<ProductI[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const data = await productsAPI.getAll();
      console.log(data);
      setProducts(data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An error occurrred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('FETCH Product');
    fetchProducts();
  }, []);

  const fetchProduct = useCallback(async (id: string): Promise<ProductI> => {
    try {
      setLoading(true);
      setError(null);
      const data = await productsAPI.getById(id);
      return data;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An error occurrred';
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    products,
    error,
    loading,
    fetchProduct,

    // TODO: implement
    createProduct: function (
      productData: CreateProductDataI
    ): Promise<ProductI> {
      console.log(productData);
      throw new Error('Function not implemented.');
    },
  };
};
