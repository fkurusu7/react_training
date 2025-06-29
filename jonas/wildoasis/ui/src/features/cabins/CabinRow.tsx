import { useState } from 'react';
import styled from 'styled-components';
import type { Cabin } from '../../types/cabin.type';
import SpinnerMini from '../../ui/SpinnerMini';
import { formatCurrency } from '../../utils/helpers';
import CreateCabinForm from './CreateCabinForm';
import { useDeleteCabin } from './useDeleteCabin';

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }: { cabin: Cabin }) {
  const [showForm, setShowForm] = useState(false);
  const { isPending, mutate: deleteCabin } = useDeleteCabin();

  const imageSrc = !cabin.image ? undefined : cabin.image;

  return (
    <>
      <TableRow role='row'>
        <Img src={imageSrc} alt={cabin.name} />
        <Cabin>{cabin.name}</Cabin>
        <div>{cabin.maxCapacity} guests</div>
        <Price>{formatCurrency(cabin.regularPrice)}</Price>
        {cabin.discount ? (
          <Discount>{cabin.discount} %</Discount>
        ) : (
          <div>&mdash;</div>
        )}
        <div>
          <button onClick={() => setShowForm((show) => !show)}>Edit</button>
          <button onClick={() => deleteCabin(cabin)} disabled={isPending}>
            {isPending ? <SpinnerMini /> : 'delete'}
          </button>
        </div>
      </TableRow>
      {showForm && <CreateCabinForm cabinToEdit={cabin} />}
    </>
  );
}

export default CabinRow;
