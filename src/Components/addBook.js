import React, { useState, useEffect } from "react";
import axios from "axios";
import Book from "./Model";
import { BASE_URL } from "../Config/config";
import { succesMsg, errorMsg } from "../helper/toast";
import { toast, ToastContainer } from "react-toastify";

const AddBook = () => {
  const [book, setBook] = useState(new Book());
  const [showToast, setShowToast] = useState(false);

  const handleBook = (field, value) => {
    setBook((prevBook) => ({
      ...prevBook,
      [field]: value,
    }));
  };

  const cleaner = () => {
    setBook(new Book());
    const inputs = document.getElementsByTagName("input");
    Array.from(inputs).forEach((input) => {
      input.value = "";
    });
  };

  useEffect(() => {}, [book]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(BASE_URL, JSON.stringify(book), {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setShowToast(true);
      succesMsg();
      cleaner();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ width: "60%" }}>
      {showToast && <ToastContainer />}
      <div className="jumbotron jumbotron-fluid bg-primary mt-5 w-80 ">
        <h1 className="display-4">Add new book</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="form-group">
            <label>Book's Title</label> <br />
            <input
              id="title"
              className="rounded mt-3 "
              type="text"
              value={book.title}
              onChange={(e) => handleBook("title", e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>author</label>
            <br />
            <input
              className="rounded mt-3 "
              type="text"
              id="author"
              value={book.author}
              onChange={(e) => handleBook("author", e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Likes</label>
            <br />
            <input
              className="rounded mt-3 mb-2"
              type="number"
              id="likes"
              value={book.likes}
              onChange={(e) => handleBook("likes", e.target.value)}
            />
          </div>
          <input
            type="submit"
            className="btn btn-warning btn-lg btn-block mb-5"
            value="Save"
          />
        </form>
      </div>
    </div>
  );
};

export default AddBook;
