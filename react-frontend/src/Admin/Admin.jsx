import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Admin(props) {
    const [books, setPrd] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const onSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    useEffect(() => {
        fetch("http://localhost:8080/books")
            .then((response) => response.json())
            .then((data) => setPrd(data))
            .catch((err) => console.log(err));
    }, [books]);

    const deleteBook = async (id) => {
        const options1 = {
            method: "DELETE",
            url: `http://localhost:8080/book/delete/${id}`,
        };

        await axios.request(options1);
    };  
    

    const filteredStus = books.filter((book) => book.title.toLowerCase().includes(searchQuery.toLowerCase()));
const handleLogout=()=>{
    navigate('/login')
}
    return (
        <div className="container" >
            <h2 className="text-center bg-light">Book List</h2>
            <button className="btn btn-primary mb-2" onClick={handleLogout}>
                 Đăng xuất
            </button>
            <div className="row"></div>
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
            <div className="row">
                <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Tên sách</th>
                            <th>Tác giả</th>
                            <th>Thể loại</th>
                            <th>Ngày phát hành</th>
                            <th>Số trang</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStus.map((book) => (
                            <tr key={book.bookcode}>
                                <td>{book.bookcode}</td>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.category}</td>
                                <td>{book.release_date}</td>
                                <td>{book.numberofpage}</td>
                            
                                
                                <td>
                                    <Link to={`/view/${book.bookcode}`}>
                                        <button className="btn btn-primary me-2">
                                            View
                                        </button>
                                    </Link>

                                    <button
                                        className="btn btn-danger"
                                        onClick={() => {
                                            console.log(book.bookcode);
                                            if (window.confirm("Bạn có chắc muốn xóa sách" + book.bookcode +" không?")) {
                                                deleteBook(book.bookcode);
                                                
                                            }
                                        }}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Link to="/addbook">
                <div className="btn btn-primary text-center">
                    Add Book
                </div>
            </Link>
        </div>
    );
}

export default Admin;
