import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Editbook = (props) => {
  const id = useParams();
  const bookId = id.id;

  const navigate = useNavigate();

  const [book, setBook] = useState({});

  const handleEdit = (field, value) => {
    setBook((prevBook) => ({
      ...prevBook,
      [field]: value,
    }));
  };

  useEffect(() => {
    const fetchBook = async (id) => {
      try {
        const response = await axios.get(
          `http://localhost:4000/books/${bookId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setBook(response.data.book);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBook(id);
  }, [bookId]);

  const handleSubmit = async (e, book) => {
    e.preventDefault();
    const { id } = book;
    console.log(id);
    console.log(book);
    try {
      const response = await axios.put(
        `http://localhost:4000/books/${id}`,
        book,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.status);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ width: "60%" }}>
      <div className="jumbotron jumbotron-fluid bg-primary mt-5 w-80 ">
        <h1 className="display-4">Edit book</h1>
        <form onSubmit={(e) => handleSubmit(e, book)}>
          <div className="form-group">
            <label>Book's Title</label> <br />
            <input
              id="title"
              className="rounded mt-3 "
              type="text"
              value={book.title}
              onChange={(e) => handleEdit("title", e.target.value)}
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
              onChange={(e) => handleEdit("author", e.target.value)}
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
              onChange={(e) => handleEdit("likes", e.target.value)}
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

export default Editbook;
