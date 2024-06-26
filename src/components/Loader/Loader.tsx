import React from "react";
import { InfinitySpin } from "react-loader-spinner";
import style from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={style.loader}>
      <InfinitySpin
        visible={true}
        width="200"
        color="#4fa94d"
        ariaLabel="infinity-spin-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={["rgb(0, 0, 239)", "rgb(0, 0, 239)"]}
      />
    </div>
  );
};

export default Loader;

