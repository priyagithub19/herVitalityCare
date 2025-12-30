import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login  from './login';
import Register from './reg'
import DashboardNav from '../frontend/src/DashboardNav';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/reg" element={<Register />} />
      <Route path="/dashboard" element={<DashboardNav />} />
    </Routes>
  </Router>
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
