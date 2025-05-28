import { useSearchParams } from 'react-router-dom';

export function useUrlPosition() {
  const [searchParams] = useSearchParams();
  const latMap = searchParams.get('lat');
  const lngMap = searchParams.get('lng');

  return { latMap, lngMap };
}
