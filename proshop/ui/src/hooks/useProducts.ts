import { useCallback, useEffect, useRef, useState } from 'react';
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

  // To keep track current request controller
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchProducts = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      abortControllerRef.current = new AbortController();

      const data = await productsAPI.getAll(abortControllerRef.current.signal);
      console.log(data);
      setProducts(data);
    } catch (error) {
      // Don't set error state if request was aborted
      if (error instanceof DOMException && error.name === 'AbortError') {
        console.log('Request was aborted');
        return;
      }
      const errorMessage =
        error instanceof Error ? error.message : 'An error occurrred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();

    // Cleanup function to abort request if component unmounts
    return () => {
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, []);

  const fetchProduct = useCallback(
    async (id: string, signal?: AbortSignal): Promise<ProductI | undefined> => {
      try {
        setLoading(true);
        setError(null);
        const data = await productsAPI.getById(id, signal);
        return data;
      } catch (error) {
        // Don't set error state if request was aborted
        if (error instanceof DOMException && error.name === 'AbortError') {
          console.log('Individual product fetch was aborted');
          return;
        }

        const errorMessage =
          error instanceof Error ? error.message : 'An error occurrred';
        console.log(errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    []
  );

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
