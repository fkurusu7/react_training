import { HiPencil, HiTrash } from 'react-icons/hi2';
import styled from 'styled-components';
import type { Cabin } from '../../types/responses.type';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Modal from '../../ui/Modal';
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

function CabinRow_V1({ cabin }: { cabin: Cabin }) {
  const { isPending: isDeleting, mutate: deleteCabin } = useDeleteCabin();

  const imageSrc = !cabin.image ? undefined : cabin.image;

  return (
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
        <Modal>
          <Modal.Open opensWindowName='editCabin'>
            <button>
              <HiPencil />
            </button>
          </Modal.Open>
          <Modal.Window name='editCabin'>
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>
          <Modal.Open opensWindowName='deleteCabin'>
            <button>{isDeleting ? <SpinnerMini /> : <HiTrash />}</button>
          </Modal.Open>
          <Modal.Window name='deleteCabin'>
            <ConfirmDelete
              resourceName='cabin'
              disabled={isDeleting}
              onConfirm={() => deleteCabin(cabin)}
            />
          </Modal.Window>
        </Modal>
      </div>
    </TableRow>
  );
}

export default CabinRow_V1;
