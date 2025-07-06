import { HiPencil, HiTrash } from 'react-icons/hi2';
import styled from 'styled-components';
import type { Cabin } from '../../types/responses.type';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Menus from '../../ui/Menus';
import Modal from '../../ui/Modal';
import SpinnerMini from '../../ui/SpinnerMini';
import Table from '../../ui/Table';
import { formatCurrency } from '../../utils/helpers';
import CreateCabinForm from './CreateCabinForm';
import { useDeleteCabin } from './useDeleteCabin';

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
  const { isPending: isDeleting, mutate: deleteCabin } = useDeleteCabin();

  const imageSrc = !cabin.image ? undefined : cabin.image;

  return (
    <Table.Row>
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
          <Menus.Menu>
            <Menus.Toggle id={cabin._id} />
            <Menus.List id={cabin._id}>
              <Modal.Open opensWindowName='editCabin'>
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opensWindowName='deleteCabin'>
                <Menus.Button icon={<HiTrash />}>
                  {isDeleting ? <SpinnerMini /> : 'Delete'}
                </Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name='editCabin'>
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>

            <Modal.Window name='deleteCabin'>
              <ConfirmDelete
                resourceName='cabin'
                disabled={isDeleting}
                onConfirm={() => deleteCabin(cabin)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CabinRow;
