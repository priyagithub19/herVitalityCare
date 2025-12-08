import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import logo from '/images/logo.png';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';

export default function Login() {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');


        const handleSubmit = async (e) => {
            e.preventDefault();
            const userData = { email, password };
            try{
                axios.post('http://localhost:5000/login', userData)
                .then(response => {
                    console.log('Login successful:', response.data);
                    alert('Login successful! Welcome back.');
                    navigate('/dashboard');
                })
                .catch(error => {
                    console.error('There was an error logging in!', error);
                    alert('Login failed. Please try again.');
                });
            }
            catch (error) {
                console.error('There was an error!', error);
            }
        };
    

    const theme = useTheme();
            useEffect(() => {
            AOS.init({ duration: 1000, once: true });
          }, []);

    const navigate = useNavigate();
    const fields = [
        {id: 'email', label: 'Enter Email', type: 'email'},
        {id: 'password', label: 'Enter Password', type: 'password'}
    ]

    return (
        <Box className="login-body">
            <Box className="login-container" data-aos="flip-left">
                <img src={logo} style={{ width: '3rem', height: '3rem', objectFit: 'contain', marginBottom: '1rem' }} />
                <h1 style={{fontSize: '2rem', fontWeight: '600', fontFamily: 'Inria Serif, serif', color: '#A70550'}}>Login</h1>
                <h3 style={{fontFamily: 'Josefin Sans, sans-serif', fontWeight: '500', color: '#DB8F8D', marginTop: '1.3rem'}}>Welcome Back to Your Wellness Journey</h3>
                 <Box
                    component="form"
                    sx={{ '& > :not(style)': { mt: 1 }, width: '90%', marginTop: '2rem' }}
                    noValidate
                    autoComplete="on"
                    >
                    {fields.map((field) => (
                        <TextField
                            key={field.id}
                            id={field.id}
                            label= {field.label}
                            variant="filled"
                            fullWidth
                            className="txtfld"
                            type={field.type}
                            value={field.id === 'email' ? email : password}
                            onChange={(e) => field.id === 'email' ? setEmail(e.target.value) : setPassword(e.target.value)}
                            sx={{
                            "& .MuiFilledInput-root": {
                                height: "2.8rem",
                                borderRadius: "0.7rem",
                                backgroundColor: "rgba(200, 162, 183, 1)",
                                transition: "background-color 0.3s ease, box-shadow 0.3s ease",
                                marginBottom: "1rem",
                                "&:hover": {
                                backgroundColor: "rgba(200, 162, 183, 0.9)",
                                fontFamily: 'JetBrains Mono, monospace'
                                },
                                "&.Mui-focused": {
                                color: "#A70550",
                                backgroundColor: "rgba(200, 162, 183, 1)",
                                boxShadow: "0 0 0 2px rgba(167, 5, 80, 0.3)",
                                },
                                "&:before, &:after": {
                                display: "none",
                                },
                            },
                            "& .MuiInputBase-input": {
                                padding: "0 1rem",
                                fontSize: "1rem",
                                color: "#3b1c1a",
                                display: "flex",
                                alignItems: "center",
                            },
                            "& .MuiInputLabel-root": {
                                color: "rgba(87, 43, 40, 0.9)",
                                fontWeight: 600,
                                fontSize: "0.9rem",
                                transform: "translate(14px, -4px) scale(1)",
                                transition: "all 0.2s ease",
                            },
                            "& .MuiInputLabel-shrink": {
                                color: "#A70550",
                                transform: "translate(14px, -12px) scale(0.9)",
                                fontSize: "0.85rem",
                            },
                            }}
                        />
                        ))}
                    </Box>
                    <Button sx={{width: '70%', backgroundColor: 'rgba(242, 189, 205, 0.7)',height: '2.3rem', borderRadius: '0.7rem', marginTop: '1rem', color: '#E3046E', fontFamily: 'Kanit, sans-serif', fontWeight: '500'}} onClick={handleSubmit}>Login</Button>
                    <Box sx={{display: 'flex', flexDirection: 'column', textAlign: 'center', gap: '0.3rem', marginTop: '2.1rem', fontFamily: 'Kantumruy Pro, sans-serif'}}><p>Don’t have an account? </p><p style={{color: '#BD7689', fontWeight: '600', cursor: 'pointer'}} onClick={() => navigate('/reg')}>Register now</p></Box>
            </Box>
        </Box>
    );

}

