import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Alert,
  Snackbar,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const backgroundImageUrl =
  'https://i.pinimg.com/1200x/03/46/20/034620c6beb8ba2b4180e4629767bf57.jpg';

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!isLogin && form.password !== form.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    try {
      const endpoint = isLogin
        ? 'https://travel-iternary-planner.vercel.app/api/auth/login'
        : 'https://travel-iternary-planner.vercel.app/api/auth/register';

      const payload = isLogin
        ? { email: form.email, password: form.password }
        : {
            username: form.username,
            email: form.email,
            password: form.password,
          };

      const res = await axios.post(endpoint, payload);

      if (isLogin) {
        localStorage.setItem('user', JSON.stringify(res.data));
        setSuccessMessage('Login successful!');
        setOpenSnackbar(true);

        setTimeout(() => {
          navigate('/trips');
        }, 1500);
      } else {
        setSuccessMessage('Registration successful! Please login.');
        setOpenSnackbar(true);
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong.');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Paper sx={{ padding: 4, maxWidth: 400, width: '100%', opacity: 0.95 }}>
        <Typography variant="h5" gutterBottom align="center">
          {isLogin ? 'Login' : 'Register'}
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <TextField
              fullWidth
              margin="normal"
              label="Username"
              name="username"
              value={form.username}
              onChange={handleChange}
            />
          )}
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
          />
          {!isLogin && (
            <TextField
              fullWidth
              margin="normal"
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
            />
          )}

          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{ mt: 2 }}
          >
            {isLogin ? 'Login' : 'Register'}
          </Button>
        </form>

        <Button
          fullWidth
          onClick={() => setIsLogin(!isLogin)}
          sx={{ mt: 1 }}
        >
          {isLogin
            ? 'Don’t have an account? Register'
            : 'Already have an account? Login'}
        </Button>
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={1500}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          severity="success"
          onClose={() => setOpenSnackbar(false)}
          sx={{ width: '100%' }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LoginRegister;
