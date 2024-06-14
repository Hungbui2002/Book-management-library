import axios from 'axios';
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import "./register.css";


const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate()

  const handleRegister = () => {
    if (!username || !password || !confirmPassword) {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    const data = {
      username: username,
      password: password
    };

    axios
      .post('http://localhost:8080/api/register', data)
      .then(response => {
        const message = response.data;
        if (message === 'Registration successful') {
          setIsRegistered(true);
        } else {
          setError(message);
        }
      })
      .catch(error => {
        setError('Tên người dùng đã tồn tại');
      });
  };

  const handleCancel = () => {
    navigate('/login');
  };
  if (isRegistered) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div className="register-container">
      <div className="register-box">
        <h1 className="register-title">Đăng ký</h1>
        <div className="form-group">
          <label htmlFor="username" className="fs-6 fw-bold mb-1">
            Tên người dùng
          </label>
          <input
            type="text"
            className="form-control mb-3"
            id="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="fs-6 fw-bold mb-1">
            Mật khẩu
          </label>
          <input
            type="password"
            className="form-control mb-3"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword" className="fs-6 fw-bold mb-1">
            Xác nhận mật khẩu 
          </label>
          <input
            type="password"
            className="form-control mb-3"
            id="confirmPassword"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="d-flex">
          <button type="button" className="btn btn-primary w-50 me-1" onClick={handleRegister}>
            Đăng ký
          </button>
          <button type="button" className="btn btn-primary w-50 ms-1" onClick={handleCancel}>
            Hủy
          </button>
        </div>
        {error && <p className="text-danger">{error}</p>}
      </div>
    </div>
  );
};

export default Register;
