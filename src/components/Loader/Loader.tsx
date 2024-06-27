import React from "react";
import { InfinitySpin } from "react-loader-spinner";
import style from "./Loader.module.css"; 

const Loader: React.FC = () => {
  return (
    <div className={style.loader}>
      <InfinitySpin
        visible={true}
        width="200"
        color="#4fa94d"
        ariaLabel="infinity-spin-loading"
      />
    </div>
  );
};

export default Loader;