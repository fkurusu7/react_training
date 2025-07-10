import { useSearchParams } from 'react-router-dom';
import type { Cabin } from '../../types/responses.type';
import Menus from '../../ui/Menus';
import Spinner from '../../ui/Spinner';

import Table from '../../ui/Table';
import CabinRow from './CabinRow';
import { useGetCabins } from './useGetCabins';

function CabinTable() {
  const { isPending, data: cabins } = useGetCabins();

  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get('discount') || 'all';

  let filteredCabins;
  if (filterValue === 'all') filteredCabins = cabins?.data;
  if (filterValue === 'no-discount')
    filteredCabins = cabins?.data?.filter((cabin) => cabin.discount === 0);
  if (filterValue === 'with-discount')
    filteredCabins = cabins?.data?.filter((cabin) => cabin.discount > 0);

  const sortByValue = searchParams.get('sortBy') || '';
  const [sortField, direction] = sortByValue.split('-');
  const modifier = direction === 'asc' ? 1 : -1;
  const sortedCabins = filteredCabins?.sort((a, b) => {
    const field = sortField as keyof Cabin;
    const aValue = a[field];
    const bValue = b[field];

    // Type guard to ensure we're working with numbers
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return (aValue - bValue) * modifier;
    }

    // Fallback for non-numeric values (convert to string and compare)
    return String(aValue).localeCompare(String(bValue)) * modifier;
  });

  if (isPending) return <Spinner />;
  return (
    <Menus>
      <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        {/* {!cabins?.data?.length ? (
        <p>No Cabins, add one!</p>
        ) : (
          cabins?.data?.map((cabin) => <CabinRow key={cabin._id} cabin={cabin} />)
          )} */}

        <Table.Body
          // data={cabins?.data}
          data={sortedCabins}
          render={(cabin: Cabin) => <CabinRow key={cabin._id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
