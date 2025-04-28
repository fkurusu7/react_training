import { useState } from "react";

export function useModal() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = () => setIsOpenModal(true);
  const closeModal = (ref) => {
    // Add the closing class to the parent
    const modalOverlay = ref.current?.parentElement;
    modalOverlay.classList.add("closing");

    setTimeout(() => {
      setIsOpenModal(false);
    }, 1000);
  };
  const toggleModal = () => setIsOpenModal(!isOpenModal);

  return { isOpenModal, openModal, closeModal, toggleModal };
}
