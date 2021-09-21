import { useEffect } from "react";
import PropTypes from "prop-types";
import s from "./Modal.module.css";

export default function Modal({ togleModal, modalSrc }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Escape") {
        togleModal(false);
        console.log("выключаем модалку");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      console.log("удаляем слушатель");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [togleModal]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      togleModal(false);
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
  togleModal: PropTypes.func,
};
