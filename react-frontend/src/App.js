import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddBook from './Admin/AddBook';
import Admin from './Admin/Admin';
import View from './Admin/View';
import BookDetail from './BookDetail/BookDetail';
import Home from './Home/Home';
import Login from './Login/Login';
import Register from './Login/Register';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/view/:id" element={<View />} />
        <Route path="/addbook" element={<AddBook />} />
        <Route path="/register" element={<Register />} />
        <Route path="/books/:id" element={<BookDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;