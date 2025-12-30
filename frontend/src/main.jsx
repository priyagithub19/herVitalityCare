import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login  from './login';
import Register from './reg'
import Explore from './Explore';
import Topics from './Topics';
import TopicDetail from './TopicDetail';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/reg" element={<Register />} />
      <Route path='/explore' element={<Explore />} />
      <Route path="/topics/:categoryId" element={<Topics />} />
      <Route path="/topic/:topicId" element={<TopicDetail />} />
    </Routes>
  </Router>
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <DashTrack />
  </StrictMode>,
)
