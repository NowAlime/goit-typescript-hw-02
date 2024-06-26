import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import fetchImages from "../fetchImg";
import ImageModal from "../ImageModal/ImageModal";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from '../Loader/Loader';

interface Image {
  id: string;
  url: string;
  description: string;
  likes: number;
}

interface FetchImagesData {
  results: Image[];
  total: number;
}

function App() {
  const [error, setError] = useState<boolean | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [images, setImages] = useState<Image[]>([]);
  const [page, setPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number>(0);

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
      const data: FetchImagesData = await fetchImages(searchTerm, page);
      setImages((prevImages) => (page === 1 ? data.results : [...prevImages, ...data.results]));
      setTotalPages(Math.ceil(data.total / 15));
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImagesData();
  }, [searchTerm, page]);

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {images.length > 0 && (
        <ImageGallery images={images} isOpen={handleOpenModal} />
      )}
      {error && <ErrorMessage searchTerm={searchTerm} setError={setError} />}
      {loading && <Loader />}
      {page < totalPages && !loading && (
        <LoadMoreBtn onChange={handleLoadMore} />
      )}
      <ImageModal
        isOpen={isOpen}
        isClose={handleCloseModal}
        imageUrl={selectedImage}
      />
    </>
  );
}

export default App;
