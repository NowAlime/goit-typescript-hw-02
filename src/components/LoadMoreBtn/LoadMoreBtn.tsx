import React from "react";
import style from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  onChange: () => void;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onChange }) => {
  return (
    <button className={style.loadMore} onClick={onChange}>
      Load more
    </button>
  );
};

export default LoadMoreBtn;