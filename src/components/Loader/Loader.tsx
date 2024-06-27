import React from "react";
import { InfinitySpin } from "react-loader-spinner";
import style from "../Loader/Loader.module.css";

const Loader: React.FC = () => {
  return (
    <div className={style.loader}>
      <InfinitySpin width="200" color="#4fa94d" />
    </div>
  );
};

export default Loader;
