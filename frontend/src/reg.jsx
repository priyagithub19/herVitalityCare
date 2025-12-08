import React, {useEffect} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import logo from '/images/logo.png';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';


export default function Register() { 

    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [age, setAge] = React.useState('');
    const [phone, setPhone] = React.useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { username, email, password, age, phone };
        try{
            axios.post('http://localhost:5000/register', userData)
            .then(response => {
                console.log('Registration successful:', response.data);
                alert('Registration successful! Please login.');
                navigate('/login');
            })
            .catch(error => {
                console.error('There was an error registering!', error);
                alert('Registration failed. Please try again.');
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
    const textFieldStyle = {
        "& .MuiFilledInput-root": {
            height: "2.8rem",
            borderRadius: "0.7rem",
            backgroundColor: "rgba(200, 162, 183, 1)",
            transition: "background-color 0.3s ease, box-shadow 0.3s ease",
            marginBottom: '0.7rem',
            "&:hover": {
                backgroundColor: "rgba(200, 162, 183, 0.9)",
                fontFamily: 'JetBrains Mono, monospace'
            },
            "&.Mui-focused": {
                color: "#A70550",
                backgroundColor: "rgba(200, 162, 183, 1)",
                boxShadow: "0 0 0 2px rgba(167, 5, 80, 0.3)",
            },
            "&:before, &:after": { display: "none" },
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
    };

    return (
        <Box className="login-body">
            <Box className="login-container" data-aos="flip-right">
                <img src={logo} style={{ width: '3rem', height: '3rem', objectFit: 'contain', marginBottom: '1rem' }} alt="Logo" />
                <h1 style={{fontSize: '2rem', fontWeight: '600', fontFamily: 'Inria Serif, serif', color: '#A70550'}}>Register</h1> {/* Changed Title */}
                <h3 style={{fontFamily: 'Josefin Sans, sans-serif', fontWeight: '500', color: '#DB8F8D', marginTop: '1.3rem'}}>Start Your Wellness Journey</h3> {/* Changed Subtitle */}
                
                <Grid
                    component="form"
                    spacing={2} 
                    sx={{ width: '90%', marginTop: '2rem' }}
                    noValidate
                    justifyContent="center"
                    autoComplete="on"
                >
                    <Grid item size={12}>
                        <TextField
                                label="Enter Username"
                                variant="filled"
                                className="txtfld"
                                type="text"
                                sx={textFieldStyle}
                                fullWidth
                                onChange={(e) => setUsername(e.target.value)}
                            />
                    </Grid>
                    <Grid item size={12}>
                        <TextField
                                label="Enter Email"
                                variant="filled"
                                className="txtfld"
                                type="text"
                                fullWidth
                                sx={textFieldStyle}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                    </Grid>
                    <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '0.7rem'}}>
                        <TextField
                                label="Enter Password"
                                variant="filled"
                                className="txtfld"
                                type="password"
                                fullWidth
                                sx={textFieldStyle}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        <TextField
                                label="Enter Age"
                                variant="filled"
                                className="txtfld"
                                type="number"
                                fullWidth
                                sx={textFieldStyle}
                                onChange={(e) => setAge(e.target.value)}
                            />
                            </Box>
                    <Grid item size={12}>
                        <TextField
                                label="Enter Phone No."
                                variant="filled"
                                className="txtfld"
                                type="text"
                                fullWidth
                                sx={textFieldStyle}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                    </Grid>
                </Grid>
                <Button type="submit" sx={{width: '70%', backgroundColor: 'rgba(242, 189, 205, 0.7)',height: '2.3rem', borderRadius: '0.7rem', marginTop: '1rem', color: '#E3046E', fontFamily: 'Kanit, sans-serif', fontWeight: '500'}} onClick={handleSubmit}>Register</Button>
                <Box sx={{display: 'flex', flexDirection: 'column', textAlign: 'center', gap: '0.3rem', marginTop: '2.1rem', fontFamily: 'Kantumruy Pro, sans-serif'}}><p>Don’t have an account? </p><p style={{color: '#BD7689', fontWeight: '600', cursor: 'pointer'}} onClick={() => navigate('/login')}>Login now</p></Box>
            </Box>
        </Box>
    );
}