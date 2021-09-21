import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import fetchImages from "../../services/Api";
import SearchBar from "../SearchBar/SearchBar";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import ImageGallery from "../ImageGallery/ImageGallery";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import Load from "../Loader/Loader";
import s from "./App.module.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default function App() {
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [page, setPage] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const [hits, setHits] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalSrc, setModalSrc] = useState("");

  useEffect(() => {
    if (!name) {
      return;
    }
    togleLoader(true);
    fetchImages(name, page)
      .then((totalImages) => {
        setHits(totalImages.data.hits.length);
        if (totalImages.data.hits.length === 0) {
          toast.error(
            "Sorry, there are no images matching your search query. Please try again."
          );
          setHits(0);
        }

        setImages((prevImages) => [...prevImages, ...totalImages.data.hits]);
        scrollToBottom();
      })
      .catch((error) => {
        alert("error");
      })
      .finally(() => {
        togleLoader(false);
      });
  }, [name, page]);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const writeToState = (data) => {
    if (data.image) {
      setImages([]);
      setName(data.image);
      setPage(data.page);
      setHits(data.hits);
    } else {
      setPage(data.page);
    }
  };

  const handleSrcState = (data1, data2) => {
    setModalSrc(data1);
    setShowModal(data2);
  };

  const togleModal = (data) => {
    setShowModal(data);
  };

  const togleLoader = (data) => {
    return setShowLoader(data);
  };

  return (
    <div className={s.App}>
      <Toaster />
      <SearchBar onSubmit={writeToState} />
      {showLoader && <Load />}
      <ImageGallery>
        <ImageGalleryItem
          imageGallery={images}
          handleSrcState={handleSrcState}
        />
      </ImageGallery>
      {page && (
        <Button onSubmit={writeToState} currentPage={page} totalHits={hits} />
      )}
      {showModal && <Modal modalSrc={modalSrc} togleModal={togleModal} />}
      {showLoader && <Load />}
    </div>
  );
}
