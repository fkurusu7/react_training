import { useState } from "react";

export function useModal() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = () => setIsOpenModal(true);
  const closeModal = (ref) => {
    ref.current?.classList.add("closing");

    setTimeout(() => {
      setIsOpenModal(false);
    }, 1000);
  };
  const toggleModal = () => setIsOpenModal(!isOpenModal);

  return { isOpenModal, openModal, closeModal, toggleModal };
}
