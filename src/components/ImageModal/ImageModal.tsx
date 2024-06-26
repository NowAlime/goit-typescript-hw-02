import React from 'react';
import style from '../ImageModal/ImageModal.module.css';
import ReactModal from "react-modal";
import { CSSTransition } from 'react-transition-group';

interface ImageModalProps {
  imageUrl: string;
  isOpen: boolean;
  isClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, isOpen, isClose }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={isClose}
      ariaHideApp={false}
      shouldFocusAfterRender={true}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      shouldReturnFocusAfterClose={true}
      preventScroll={false}
      aria={{
        labelledby: "heading",
        describedby: "full_description",
      }}
    >
      <CSSTransition
        in={isOpen}
        timeout={300}
        classNames={{
          enter: style.modalEnter,
          enterActive: style.modalEnterActive,
          exit: style.modalExit,
          exitActive: style.modalExitActive,
        }}
        unmountOnExit
      >
        <div className={style.modalContent}>
          <button className={style.closeButton} onClick={isClose}>Close</button>
          <div className={style.imageContainer}>
            <img className={style.image} src={imageUrl} alt="Modal content" />
          </div>
        </div>
      </CSSTransition>
    </ReactModal>
  );
};

export default ImageModal;