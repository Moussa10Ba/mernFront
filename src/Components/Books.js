import React, { useEffect, useState } from "react";
import { BASE_URL } from "../Config/config";
import axios from "axios";
import { errorMsg } from "../helper/toast";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/");
      setBooks(response.data.books);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/books/${id}`);
      const response = await axios.get("http://localhost:4000/books");
      setBooks(response.data);
      errorMsg();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id) => {};

  useEffect(() => {
    fetchData();

    console.log(books);
  }, [loading]);

  const displayTr =
    loading === true ? (
      <div className="spinner-border text-primary" role="status"></div>
    ) : (
      books.map((book) => {
        return (
          <tr key={book.id}>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.likes}</td>
            <td>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(book.id)}
              >
                🗑️
              </button>

              <button className="btn btn-warning">
                <Link to={`/editbook/${book.id}`}>✏️</Link>
              </button>
            </td>
          </tr>
        );
      })
    );

  return (
    <div className="jumbotron jumbotron-fluid mt-5 w-80  ">
      <ToastContainer />
      <table className="table table-striped text-center d-flex-justify-content-center">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Author</th>
            <th scope="col">Likes</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>{displayTr}</tbody>
      </table>
    </div>
  );
};

export default Books;
