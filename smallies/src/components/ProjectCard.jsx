import React from "react";
import { useModal } from "../hooks/useModal";
import Modal from "./Modal";

const ProjectCard = ({ name, description }) => {
  const { isOpenModal, closeModal, toggleModal } = useModal();

  return (
    <>
      <article className="projects__card" onClick={toggleModal}>
        <h2 className="heading heading-2">{name}</h2>
        <p>{description}</p>
      </article>
      {isOpenModal && (
        <Modal onClose={closeModal}>
          <h2>HOOOOLL</h2>
        </Modal>
      )}
    </>
  );
};

export default ProjectCard;
