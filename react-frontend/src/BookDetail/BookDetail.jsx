import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './bookdetail.css';
const BookDetail = () => {
  const { id } = useParams(); 
   const [book, setBook] = useState([]);
useEffect(() => {
  const getBook = async () => {
    const options = {
      method: "GET",
      url: `http://localhost:8080/book/${id}`,
      headers: { "X-Requested-With": "XMLHttpRequest" },
    };
    try {
      const res = await axios.request(options);
      setBook(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  getBook();
  }, [id]);

  if (!book) {
    return <p>Loading...</p>;
  }

  return (
    <div className='container'>
        <h2 className='bg-light mb-5 text-center'>Chi tiết sách</h2>
        <div className='row'>
            <img className='col-4' src={book.img_url} alt={book.title} />
            <div className='col-6'>
                <h1>{book.title}</h1>
                <p className='fs-5'>Tác giả: {book.author}</p>
                <p className='fs-5'>Mô tả: {book.description}</p>
                <p className='fs-5'>Ngày phát hành: {book.release_date}</p>
                <p className='fs-5'>Số trang: {book.numberofpage}</p>
                <p className='fs-5'>Thể loại: {book.category}</p>
               <div className='d-flex'>
                <p className='fs-5 fw-bold'>Số lượng:</p>
                <div>
                    <input className='input-number' type="number"/>
                    <button className='btn btn-primary'>Thêm vào giỏ</button>
                </div>
               </div>
                <div className="fs-5 fw-bold">Đánh giá: </div>
                <div class="stars">
                    <form action="">
                        <input class="star star-5" id="star-5" type="radio" name="star"/>
                        <label class="star star-5" for="star-5"></label>
                        <input class="star star-4" id="star-4" type="radio" name="star"/>
                        <label class="star star-4" for="star-4"></label>
                        <input class="star star-3" id="star-3" type="radio" name="star"/>
                        <label class="star star-3" for="star-3"></label>
                        <input class="star star-2" id="star-2" type="radio" name="star"/>
                        <label class="star star-2" for="star-2"></label>
                        <input class="star star-1" id="star-1" type="radio" name="star"/>
                        <label class="star star-1" for="star-1"></label>
                    </form>
                </div>
                <div className="fs-5 fw-bold mb-2">Bình luận </div>
                <div className='d-flex'>
                <input className='form-control me-3' placeholder='Viết bình luận' type="text" />
                <button className='btn btn-outline-primary'><img className='img-send' src="https://cdn-icons-png.flaticon.com/512/3682/3682321.png" alt="" /></button>
                </div>
            </div>

        </div>
    </div>
  );
  }
export default BookDetail;
