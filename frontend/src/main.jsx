import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './login';
import Register from './reg'
import Explore from './Explore';
import DashTrack from './DashTrack';
import DashHome from './DashHome';
import CheckInput from './checklistInput';
import { ThemeProvider, CssBaseline } from "@mui/material";
import DigitalHealthReport from './DigitalHealthReport';
// import CheckInput from './checklistInput.jsx';
import pinkTheme from "./theme";


const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/reg" element={<Register />} />
      <Route path='/explore' element={<Explore />} />
      <Route path='/dashboard' element={<DashHome />} />
      <Route path='/trackingPage' element={<DashTrack />} />
      <Route path='/digitalReport' element={<DigitalHealthReport />} />
    </Routes>
  </Router>
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <ThemeProvider theme={pinkTheme}>
      <CssBaseline />
      <DigitalHealthReport />
    </ThemeProvider> */}
    <App />
    {/* <DigitalHealthReport /> */}
  </StrictMode>,
)
