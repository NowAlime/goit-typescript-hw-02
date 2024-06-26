import React from 'react';
import Modal from 'react-modal';
import { CSSTransition } from 'react-transition-group';

interface Image {
  id: string;
  urls: {
    regular: string;
  };
  alt_description: string;
  likes: number;
}

interface ImageModalProps {
  images: Image[];
  isOpen: boolean;
  isClose: () => void;
  imageUrl: string;
}

const ImageModal: React.FC<ImageModalProps> = ({ images, isOpen, isClose, imageUrl }) => {
  const selectedImage = images.find((img) => img.urls.regular === imageUrl);

  return (
    <Modal isOpen={isOpen} onRequestClose={isClose}>
      <CSSTransition in={isOpen} timeout={300} classNames="fade" unmountOnExit>
        <div>
          {selectedImage && (
            <>
              <img src={selectedImage.urls.regular} alt={selectedImage.alt_description} />
              <p>{selectedImage.alt_description}</p>
              <p>{selectedImage.likes} likes</p>
            </>
          )}
        </div>
      </CSSTransition>
    </Modal>
  );
};

export default ImageModal;
