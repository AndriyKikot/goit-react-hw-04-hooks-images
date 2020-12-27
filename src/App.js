import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import pixabayApi from './services/pixabayApi';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Loader from './components/Loader/Loader';
import Modal from './components/Modal';

function App() {
  const [query, setQuery] = useState('new year');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(15);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [imgTags, setImgTags] = useState(null);

  useEffect(() => {
    async function fetchApi() {
      try {
        const options = { page, query, pageSize };
        const images = await pixabayApi(options);

        setImages(prevImages => [...prevImages, ...images]);

        if (images.length < 1) {
          toast.error('Your request was not found');
          setError(true);
          return;
        }

        if (page !== 1) {
          scrollToBottom();
        }
      } catch (error) {
        setError('Something went wrong. Try again.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchApi();
  }, [query, page, pageSize]);

  const handleFormSubmit = newQuery => {
    if (query === newQuery) {
      return;
    }

    setQuery(newQuery);
    setPage(1);
    setImages([]);
    setError(null);
  };

  const handleLoadMore = () => {
    setIsLoading(true);
    setPage(prevPage => prevPage + 1);
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

  const setImgData = ({ largeImageURL, tags }) => {
    setLargeImageURL(largeImageURL);
    setImgTags(tags);
  };

  const shouldRenderLoadMoreBtn = images.length > 0 && !isLoading;

  return (
    <div>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery
        images={images}
        onOpenModal={toggleModal}
        onSetImgData={setImgData}
      />
      {shouldRenderLoadMoreBtn && <Button onClickHandler={handleLoadMore} />}
      {isLoading && <Loader />}
      {showModal && (
        <Modal onCloseModal={toggleModal}>
          <img src={largeImageURL} alt={imgTags} />
        </Modal>
      )}
      {error && <p className="text-error">404</p>}
      <ToastContainer autoClose={3000} />
    </div>
  );
}

export default App;
