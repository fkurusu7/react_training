import { useState } from 'react';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreateCabinForm from './CreateCabinForm';

function AddCabin() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpenModal((isOpenModal) => !isOpenModal)}>
        Add Cabin
      </Button>
      {isOpenModal && (
        <Modal onCloseModal={() => setIsOpenModal((open) => !open)}>
          <CreateCabinForm
            onCloseModal={() => setIsOpenModal((open) => !open)}
          />
        </Modal>
      )}
    </div>
  );
}

export default AddCabin;
