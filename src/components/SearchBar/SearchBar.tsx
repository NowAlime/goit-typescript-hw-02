import React from 'react';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import { useId } from 'react-id-generator';
import { IoSearchOutline } from 'react-icons/io5';
import toast, { Toaster } from 'react-hot-toast';
import style from '../SearchBar/SearchBar.module.css';

interface SearchBarProps {
  onSearch: (text: string) => void;
}

interface FormValues {
  text: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchId] = useId();

  const handleSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
    const { text } = values;
    if (!text) {
      toast.error(
        <p className={style.errorToast}>
          Please enter a search query!
        </p>
      );
      return;
    } else {
      onSearch(text);
    }

    actions.resetForm();
  };

  return (
    <header className={style.topHeader}>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: "",
          duration: 4000,
          style: {
            background: "blue",
            color: "#fff",
          },
        }}
      />
      <Formik onSubmit={handleSubmit} initialValues={{ text: "" }}>
        <Form className={style.form}>
          <div>
            <label className={style.nameOfLabel} htmlFor={searchId}>
              Search
            </label>
            <Field
              className={style.searchText}
              type="text"
              name="text"
              id={searchId}
              autoFocus
              placeholder="Search images and photos"
            />
            <ErrorMessage name="text" component="span" />
          </div>
          <button className={style.formBtn} type="submit">
            <IoSearchOutline className={style.icon} />
          </button>
        </Form>
      </Formik>
    </header>
  );
};

export default SearchBar;
