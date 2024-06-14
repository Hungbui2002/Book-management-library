import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

const Home = () => {
  const navigate = useNavigate();


  const handleLogout = () => {
    navigate(`/login`);
  };

  const handleBookClick = (bookId) => {
    navigate(`/books/${bookId}`);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStus = books.filter((book) => book.title.toLowerCase().includes(searchQuery.toLowerCase()));
  const onSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  return (
    <div className='bg-light'>
      <div className="container">
        <div className>
          <h2 className='text-center'>Books list</h2>
          <button className="btn btn-primary mb-3" onClick={handleLogout}>
            Đăng xuất     
          </button>
          <div className="row mb-3">
                <div className="col-lg-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Tìm kiếm theo tên sách"
                        value={searchQuery}
                        onChange={onSearchChange}
                    />
                </div>
            </div>
        </div>
        <div className="book-grid">
          {filteredStus.map((book) => (
            <div
              key={book.bookcode}
              className="book-card"
              onClick={() => handleBookClick(book.bookcode)}
            >
              <h2>{book.title}</h2>
              <p>Tác giả: {book.author}</p>
              <img className="imgCover" src={book.img_url} alt={book.title} />

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
