import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import logo from '/images/logo.png';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';

export default function Register() {
  const navigate = useNavigate();
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // ✅ State for form
const [formData, setFormData] = useState({
  username: '',
  email: '',
  password: '',
  age: '',
  phone: ''
});

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // ✅ Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/register', formData);
      alert(res.data.message);
      navigate('/login');
    } catch (error) {
      console.error("Register error:", error.response?.data || error);
      alert(error.response?.data?.error || "Registration failed");
    }
  };

  const textFieldStyle = {
    "& .MuiFilledInput-root": {
      height: "2.8rem",
      borderRadius: "0.7rem",
      backgroundColor: "rgba(200, 162, 183, 1)",
      marginBottom: '0.7rem',
      "&:hover": { backgroundColor: "rgba(200, 162, 183, 0.9)" },
      "&.Mui-focused": { boxShadow: "0 0 0 2px rgba(167, 5, 80, 0.3)" },
      "&:before,&:after": { display: "none" }
    },
    "& .MuiInputBase-input": { padding: "0 1rem" },
    "& .MuiInputLabel-root": { color: "#3b1c1a" },
    "& .MuiInputLabel-shrink": { color: "#A70550" }
  };

  return (
    <Box className="login-body">
      <Box className="login-container" data-aos="flip-right">
        <img src={logo} style={{ width: '3rem', height: '3rem', marginBottom: '1rem' }} alt="Logo" />
        <h1 style={{color: '#A70550'}}>Register</h1>
        <h3 style={{color: '#DB8F8D'}}>Start Your Wellness Journey</h3>

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '90%', mt: 2 }}>
<TextField
  label="Enter Username"
  name="username"
  value={formData.username}
  onChange={handleChange}
  variant="filled"
  fullWidth
  sx={textFieldStyle}
/>
          <TextField
            label="Enter Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            variant="filled"
            fullWidth
            sx={textFieldStyle}
          />
          <TextField
            label="Enter Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            variant="filled"
            fullWidth
            sx={textFieldStyle}
          />
          <TextField
            label="Enter Age"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            variant="filled"
            fullWidth
            sx={textFieldStyle}
          />
          <TextField
            label="Enter Phone No."
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            variant="filled"
            fullWidth
            sx={textFieldStyle}
          />

          <Button
            type="submit"
            sx={{ width: '70%', mt: 2, bgcolor: 'rgba(242,189,205,0.7)' }}
          >
            Register
          </Button>
        </Box>

        <Box sx={{ mt: 2, textAlign: 'center', cursor: 'pointer' }} onClick={() => navigate('/login')}>
          Already have an account? Login now
        </Box>
      </Box>
    </Box>
  );
}
