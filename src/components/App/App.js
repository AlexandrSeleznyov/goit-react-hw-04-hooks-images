import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import fetchImages from "../../services/api";
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
  const [page, setPage] = useState(1);
  const [showLoader, setShowLoader] = useState(false);
  const [hits, setHits] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalSrc, setModalSrc] = useState("");

  useEffect(() => {
    if (!name) {
      return;
    }
    setShowLoader(true);
    async function getImages() {
      try {
        const images = await fetchImages(name, page);
        console.log(images);
        console.log("name", name);

        setHits(images.length);

        if (!images.length) {
          toast.error(
            "Sorry, there are no images matching your search query. Please try again."
          );
          setHits(0);
        }
        setImages((prevImages) => [...prevImages, ...images]);
        scrollToBottom();
      } catch (e) {
        alert(e);
      } finally {
        setShowLoader(false);
      }
    }
    getImages();
  }, [name, page]);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const writeToState = (data) => {
    if (data) {
      setName(data);
    }
  };
  const changePage = (data) => {
    setPage(data.page);
    console.log("page", page);
  };

  const handleSrcState = (data1, data2) => {
    setModalSrc(data1);
    setShowModal(data2);
  };

  const toggleModal = (data) => {
    setShowModal(data);
  };

  return (
    <div className={s.app}>
      <Toaster />
      <SearchBar onSubmit={writeToState} />
      {showLoader && <Load />}
      <ImageGallery>
        <ImageGalleryItem
          imageGallery={images}
          handleSrcState={handleSrcState}
        />
      </ImageGallery>
      {page && name && (
        <Button onSubmit={changePage} currentPage={page} totalHits={hits} />
      )}
      {showModal && <Modal modalSrc={modalSrc} toggleModal={toggleModal} />}
    </div>
  );
}
