import { useSearchParams } from 'react-router-dom';
import Select from './Select';

interface SortProps {
  options: { value: string; label: string }[];
}

function SortBy({ options }: SortProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy') || '';

  function onChange(ev: React.ChangeEvent<HTMLSelectElement>) {
    searchParams.set('sortBy', ev.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select options={options} value={sortBy} onChange={onChange} type='white' />
  );
}

export default SortBy;
