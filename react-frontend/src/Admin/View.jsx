import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./view.css";

import axios from "axios";

const View = () => {
  const { id } = useParams();
  const [book, setBook] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const history = useNavigate();

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

  const updateBook = async (e) => {
    e.preventDefault();

    // Hiển thị popup confirm
    const confirmed = window.confirm("Bạn có chắc chắn muốn cập nhật sách?");

    if (!confirmed) {
      return; // Không gửi yêu cầu cập nhật nếu người dùng không xác nhận
    }
    const options1 = {
      method: "PUT",
      url: `http://localhost:8080/book/update/${id}`,
      data: {
        bookcode: book.bookcode,
        title: book.title,
        author: book.author,
        description: book.description,
        release_date: book.release_date,
        numberofpage: book.numberofpage,
        category: book.category,
        img_url: book.img_url,
      },
    };
    console.log(book);
    try {
      await axios.request(options1);
      history("/admin");
    } catch (error) {
      console.error(error);
    }
  };

  const enableEditMode = () => {
    setEditMode(true);
  };


  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "htscdzkz");

    data.append("cloud_name", "dx1jurmwt");
    fetch("https://api.cloudinary.com/v1_1/dx1jurmwt/image/upload", {
        method: "POST",
        body: data,
    })
        .then((res) => res.json())
        .then((data) => {
            const imageUrl = data.url; // Lấy URL của hình ảnh đã tải lên
            setBook((prev) => ({ ...prev, img_url: imageUrl })); // Cập nhật giá trị của 'img_url' với URL của hình ảnh
        })
        .catch((error) => console.log(error));
};

  return (
    <div className="">
      <div className="container">
      <h2 className="bg-light text-center">Chi tiết sách</h2>
        <div className="row">
          <div className="col-6">
            <div className="d-flex">
              <div className="title">
                <label htmlFor="Text">Tiêu đề: </label> <br />
                <input
                  className="form-control w-26"
                  type="text"
                  value={book.title}
                  onChange={(e) => {
                    setBook((prev) => ({ ...prev, title: e.target.value }));
                    console.log(book);
                  }}
                  disabled={!editMode} // Vô hiệu hóa đầu vào khi không ở chế độ chỉnh sửa
                />
              </div>
              <div className="author">
                <label htmlFor="Text">Tác giả: </label> <br />
                <input
                  className="form-control w-26"
                  type="text"
                  value={book.author}
                  onChange={(e) => {
                    setBook((prev) => ({ ...prev, author: e.target.value }));
                  }}
                  disabled={!editMode} // Vô hiệu hóa đầu vào khi không ở chế độ chỉnh sửa
                />
              </div>
            </div>
            <div className="description">
              <label htmlFor="Text">Mô tả: </label> <br />
              <textarea
                className="form-control w-100"
                type="text"
                value={book.description}
                onChange={(e) => {
                  setBook((prev) => ({ ...prev, description: e.target.value }));
                }}
                style={{ height: "300px" }}
                disabled={!editMode}
              />
            </div>
            <div className="date-pageNumber d-flex">
              <div className="date">
                <label htmlFor="Text">Ngày phát hành: </label> <br />
                <input
                  className="form-control"
                  type="date"
                  value={book.release_date}
                  onChange={(e) => {
                    setBook((prev) => ({ ...prev, name: e.target.value }));
                  }}
                  disabled={!editMode}
                />
              </div>
              <div className="pagenumber">
                <label htmlFor="Text">Số trang: </label> <br />
                <input
                  className="form-control"
                  type="number"
                  value={book.numberofpage}
                  onChange={(e) => {
                    setBook((prev) => ({ ...prev, numberofpage: parseInt(e.target.value) }));
                  }}
                  disabled={!editMode}
                />
              </div>
            </div>

            <div className="category">
              <label htmlFor="category">Thể loại:</label>
              <br />
              <select
                className="form-control"
                id="category"
                value={book.category}
                onChange={(e) => {
                  setBook((prev) => ({ ...prev, category: e.target.value }));
                }}
                disabled={!editMode}
              >
                <option value="">Chọn thể loại</option>
                <option value="Khoa học công nghệ – Kinh tế">Khoa học công nghệ – Kinh tế</option>
                <option value="Văn học nghệ thuật">Văn học nghệ thuật</option>
                <option value="Văn hóa xã hội – Lịch sử">Văn hóa xã hội – Lịch sử</option>
                <option value="Giáo trình">Giáo trình</option>
                <option value="Sách thiếu nhi">Sách thiếu nhi</option>
                <option value="Truyện, tiểu thuyết">Truyện, tiểu thuyết</option>
                <option value="Tâm lý, tâm linh, tôn giáo">Tâm lý, tâm linh, tôn giáo</option>
                <option value="Khác">Khác</option>
              </select>
            </div>
          </div>

          <div className="col-6">
            <div className="coverimg">
              <label htmlFor="Text">Ảnh bìa: </label> <br />
              <img
                src={book.img_url}
                alt={book.title}
                style={{height: "400px" }}
              />
              {editMode && (
                <div>
                  <input
                    type="file"
                    // accept="image/*"
                    onChange={handleImageUpload}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        {!editMode && (
          <div className="btn btn-primary" onClick={enableEditMode}>
            Chỉnh sửa
          </div>
        )}
        {editMode && (
          <div className="btn btn-primary" onClick={updateBook}>
            Lưu
          </div>
        )}
      </div>
    </div>
  );
};

export default View;
