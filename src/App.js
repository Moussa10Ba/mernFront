import "./App.css";
import AddBook from "./Components/addBook";
import Books from "./Components/Books";
import Editbook from "./Components/editbook";
import Navbar from "./Components/navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/addbook" element={<AddBook />} />
        <Route path="/" element={<Books />} />
        <Route path="/editbook/:id" element={<Editbook />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
