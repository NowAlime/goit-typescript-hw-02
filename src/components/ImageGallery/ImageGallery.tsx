import React from 'react';

interface Image {
  id: string;
  url: string;
  alt: string;
}

interface ImageGalleryProps {
  images: Image[];
  onImageClick: (id: string) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onImageClick }) => (
  <div className="image-gallery">
    {images.map(image => (
      <img
        key={image.id}
        src={image.url}
        alt={image.alt}
        onClick={() => onImageClick(image.id)}
      />
    ))}
  </div>
);

export default ImageGallery;