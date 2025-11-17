import { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Navbar } from './components/Navbar';
import axios from 'axios';
import store from './store';
import { observer } from 'mobx-react-lite';

axios.defaults.withCredentials = true;

function App() {
  useEffect(() => {
    const fetchUser = async () => {
      const result = await store.fetchUser();
    };
    fetchUser();
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default observer(App);
