import { useEffect } from "react";
import PropTypes from "prop-types";
import s from "./Modal.module.css";

export default function Modal({ toggleModal, modalSrc }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Escape") {
        toggleModal(false);
        console.log("выключаем модалку");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      console.log("удаляем слушатель");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [toggleModal]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      toggleModal(false);
    }
  };

  return (
    <div className={s.Overlay} onClick={handleBackdropClick}>
      <div className={s.Modal}>
        <img src={modalSrc} alt="" />
      </div>
    </div>
  );
}

Modal.propTypes = {
  modalSrc: PropTypes.string,
  toggleModal: PropTypes.func,
};
