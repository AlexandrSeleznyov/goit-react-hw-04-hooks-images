import React from "react";
import Loader from "react-loader-spinner";
import s from "./Loader.module.css";

export default class Load extends React.Component {
  render() {
    return (
      <Loader
        className={s.Loader}
        type="Watch"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={500}
      />
    );
  }
}
