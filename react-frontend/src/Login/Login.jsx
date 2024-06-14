import axios from 'axios';
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import "./login.css";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate()  

  const handleLogin = () => {
    if (!username || !password) {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    const data = {
      username: username,
      password: password
    };

    axios
      .post('http://localhost:8080/api/login', data)
      .then(response => {
        const message = response.data;
        if (message === 'Login successful') {
          setIsLoggedIn(true);
          setIsAdmin(false);
        } else if (message === 'Login successful as admin') {
          setIsLoggedIn(true);
          setIsAdmin(true);
        } else {
          setError(message);
        }
      })
      .catch(error => {
        setError('Sai thông tin đăng nhập');
      });
  };

  if (isLoggedIn) {
    if (isAdmin) {
      return <Navigate to="/admin" />;
    } else {
      return <Navigate to="/home" />;
    }
  }
  const handleRegister = () => {
    navigate('/register');
  }
  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Đăng nhập</h1>
        <div className="form-group">
          <label htmlFor="username" className="fs-6 fw-bold mb-1">
            Tên đăng nhập
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
        <div>
        <button className="btn btn-primary w-100" onClick={handleLogin}>
          Đăng nhập
        </button>
        {error && <p className="text-danger">{error}</p>}
        <div className='mt-3'>Nếu bạn chưa có tài khoản <a className="primary pointer" onClick={handleRegister}>
          Đăng ký ngay
        </a></div>
        
        </div>
      </div>
    </div>
  );
};

export default Login;
