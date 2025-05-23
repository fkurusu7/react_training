import { useEffect, useState } from 'react';
import { OMDB_API_URI } from '../App';

export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError(undefined);
        const response = await fetch(`${OMDB_API_URI}&s=${query}`, {
          signal: abortController.signal,
        });
        if (!response.ok) throw new Error('Something went wrong');
        const jsonRes = await response.json();

        if (jsonRes.Response === 'False') {
          throw new Error('Movie not found');
        }

        setMovies(jsonRes.Search);
      } catch (error) {
        if (error.name !== 'AbortError') {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
        setError(undefined);
      }
    };

    if (query.length <= 2) {
      setMovies([]);
      setError(undefined);
      return;
    }

    callback?.();
    fetchMovies();

    return () => {
      abortController.abort();
    };
  }, [query]);

  return { movies, isLoading, error };
}
