import React, { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import fetchImages, { UnsplashImage, UnsplashResponse } from "../fetchImages";
import ImageModal from "../ImageModal/ImageModal";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from '../Loader/Loader';
import style from "./App.module.css"; 

const App: React.FC = () => {
  const [error, setError] = useState<boolean | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [totalPages, setTotalPages] = useState(0);

  const handleOpenModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedImage("");
    setIsOpen(false);
  };

  const handleSearch = (searchTerm: string) => {
    setImages([]);
    setPage(1);
    setSearchTerm(searchTerm);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const fetchImagesData = async () => {
    if (!searchTerm) return;

    setLoading(true);
    setError(null);

    try {
      const data: UnsplashResponse = await fetchImages(searchTerm, page);
      console.log("Fetched data:", data);
      setImages((prevImages) => (page === 1 ? data.results : [...prevImages, ...data.results]));
      setTotalPages(Math.ceil(data.total / 10));
    } catch (error) {
      console.error("Error fetching images:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImagesData();
  }, [searchTerm, page]);

  return (
    <div className={style.app}>
      <SearchBar onSearch={handleSearch} />
      {images.length > 0 && (
        <ImageGallery images={images} isOpen={handleOpenModal} />
      )}
      {error && <ErrorMessage />}
      {loading && <Loader />}
      {page < totalPages && !loading && (
        <LoadMoreBtn onChange={handleLoadMore} />
      )}
      <ImageModal
        images={images}
        isOpen={isOpen}
        isClose={handleCloseModal}
        imageUrl={selectedImage}
      />
    </div>
  );
};

export default App;
