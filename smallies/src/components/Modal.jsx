import React from "react";
import { createPortal } from "react-dom";
import { useOutsideClick } from "../hooks/useOutsideClick";

const Modal = ({ onClose, children }) => {
  const ref = useOutsideClick(onClose);

  return createPortal(
    <div className="modal__overlay">
      <div className="modal__container" ref={ref}>
        <button className="modal__button" onClick={() => onClose(ref)}>
          X
        </button>
        <div className="modal__project">{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
