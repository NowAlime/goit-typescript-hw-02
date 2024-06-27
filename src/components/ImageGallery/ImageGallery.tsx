import React from "react";
import { UnsplashImage } from "../fetchImages";
import style from "./ImageGallery.module.css"; 

interface ImageGalleryProps {
  images: UnsplashImage[];
  isOpen: (url: string) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, isOpen }) => {
  return (
    <div className={style.imageGallery}>
      {images.map((image) => (
        <div key={image.id} className={style.imageItem} onClick={() => isOpen(image.urls.regular)}>
          <img src={image.urls.regular} alt={image.alt_description} />
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
