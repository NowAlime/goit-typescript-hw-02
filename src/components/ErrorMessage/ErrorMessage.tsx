import React from 'react';
import style from '../ErrorMessage/ErrorMessage.module.css';

const ErrorMessage: React.FC = () => {
  return (
    <div>
      <p className={`${style.error} animate`}>
        Sorry, something went wrong, try again later!
      </p>
    </div>
  );
};

export default ErrorMessage;