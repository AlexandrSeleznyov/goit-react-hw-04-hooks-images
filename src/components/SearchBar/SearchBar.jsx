import { useState } from "react";
import PropTypes from "prop-types";
import s from "./SearchBar.module.css";
import toast, { Toaster } from "react-hot-toast";

export default function SearchBar({ onSubmit }) {
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const Data = {
      image: image,
      page: 1,
      hits: 0,
    };
    image.trim() === "" ? toast.error("Please, type a word!") : onSubmit(Data);
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setImage(e.target.value);
  };

  return (
    <>
      <Toaster />
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={handleSubmit}>
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={s.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleChange}
          />
        </form>
      </header>
    </>
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func,
};
