import { useQuery } from '@tanstack/react-query';
import { getSettings } from '../../services/apiSettings';

// TODO: generate Settings types/interface
export function useGetSettings() {
  const {
    isPending,
    data: settings,
    error,
  } = useQuery({
    queryKey: ['settings'],
    queryFn: getSettings,
  });

  return {
    isPending,
    settings,
    error,
  };
}
