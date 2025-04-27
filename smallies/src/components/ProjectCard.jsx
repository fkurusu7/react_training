/* eslint-disable no-unused-vars */
import React from "react";
import { useModal } from "../hooks/useModal";
import Modal from "./Modal";

const ProjectCard = ({ name, description, component: Component }) => {
  const { isOpenModal, closeModal, toggleModal } = useModal();

  return (
    <>
      <article className="projects__card" onClick={toggleModal}>
        <h2 className="heading heading-2">{name}</h2>
        <p>{description}</p>
      </article>
      {isOpenModal && (
        <Modal onClose={closeModal}>
          <Component />
        </Modal>
      )}
    </>
  );
};

export default ProjectCard;
