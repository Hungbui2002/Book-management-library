import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const AddBook = () => {
    const [book, setBook] = useState({
        bookcode: "",
        title: "",
        author: "",
        description: "",
        release_date: "",
        numberofpage: "",
        category: "",
        img_url: "",
    });
    const [formErrors, setFormErrors] = useState({
        bookcode: "",
        title: "",
        author: "",
        description: "",
        release_date: "",
        numberofpage: "",
        category: "",
        img_url: "",
      });
    
      const history = useNavigate();
    
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setBook((prev) => ({ ...prev, [name]: value }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Kiểm tra và cập nhật thông báo lỗi
        const errors = {};
    
        if (book.release_date.trim() === "") {
          errors.release_date = "Vui lòng nhập ngày phát hành";
        }
    
        if (book.title.trim() === "") {
          errors.title = "Vui lòng nhập tiêu đề";
        }
    
        if (book.author.trim() === "") {
          errors.author = "Vui lòng nhập tác giả";
        }
        if (book.description.trim() === "") {
            errors.description = "Vui lòng nhập mô tả";
          }
        if (book.numberofpage.trim() === "") {
            errors.numberofpage = "Vui lòng nhập số trang";
        }
        if (book.category.trim() === "") {
            errors.category = "Vui lòng chọn thể loại";
          }
        // Tiến hành cập nhật thông báo lỗi
        setFormErrors(errors);
    
        // Kiểm tra nếu không có lỗi thì tiến hành submit form
        if (Object.keys(errors).length === 0) {
          // Thực hiện xử lý submit form
          const options1 = {
            method: "POST",
            url: "http://localhost:8080/book/add",
            data: book,
          };
    
          await axios.request(options1).then(() => {
            history("/admin");
          });
        }
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
        <div>
            <div className="mb-5 bg-light vh-100">
                <div className="container">
                    <h2 className="bg-light text-center">Thêm sách</h2>
                    <div className="row">
                        <div className="col-6">
                            <div className="title-author d-flex">
                                <div className="title">
                                    <label htmlFor="title">Tiêu đề:</label> <br />
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="title"
                                        value={book.title}
                                        onChange={handleInputChange}
                                    />
                                    {formErrors.title && <span className="text-danger">{formErrors.title}</span>}
                                </div>
                                <div className="author">
                                    <label htmlFor="author">Tác giả:</label> <br />
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="author"
                                        value={book.author}
                                        onChange={handleInputChange}
                                    />
                                    {formErrors.author && <span className="text-danger">{formErrors.author}</span>}
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description">Mô tả:</label> <br />
                                <textarea
                                    className="form-control"
                                    name="description"
                                    value={book.description}
                                    onChange={handleInputChange}
                                    style={{ height: "300px" }}
                                />
                                {formErrors.description && <span className="text-danger">{formErrors.description}</span>}
                            </div>
                            <div className="d-flex justify-content-between">
                                <div className="date">
                                    <label htmlFor="release_date">Ngày phát hành:</label> <br />
                                    <input
                                        className="form-control"
                                        type="date"
                                        name="release_date"
                                        value={book.release_date}
                                        onChange={handleInputChange}
                                    />
                                    {formErrors.release_date && <span className="text-danger">{formErrors.release_date}</span>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="numberofpage">Số trang:</label> <br />
                                    <input
                                        className="form-control"
                                        type="number"
                                        name="numberofpage"
                                        value={book.numberofpage}
                                        onChange={handleInputChange}
                                    />
                                    {formErrors.numberofpage && <span className="text-danger">{formErrors.numberofpage}</span>}
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="category">Thể loại:</label> <br />
                                <select
                                    className="form-control"
                                    name="category"
                                    value={book.category}
                                    onChange={handleInputChange}
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
                                {formErrors.category && <span className="text-danger">{formErrors.category}</span>}
                            </div>
                        </div>

                        <div className="col-6">
                            <div className="coverimg">
                                <label htmlFor="img_url">Ảnh bìa:</label> <br />
                                <img
                                    src={book.img_url}
                                    alt={book.title}
                                    style={{height: "400px" }}
                                />
                                <input
                                    type="file"
                                    accept="image/*"
                                    name="img_url"
                                    onChange={handleImageUpload}
                                />
                            </div>
                        </div>
                    </div>

                    <button className="btn btn-primary" onClick={handleSubmit}>
                        Thêm sách
                    </button>
                </div>

            </div>
        </div>
    );
};

export default AddBook;
