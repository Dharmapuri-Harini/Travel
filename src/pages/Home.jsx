import React, { useEffect, useRef, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Fade,
  Paper,
  Button
} from '@mui/material';
import About from '../components/About';
import Process from '../components/Process';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const bgImages = [
  'https://wallpaperaccess.com/full/1194086.jpg',
  'https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80',
];

const Home = () => {
  const [currentBg, setCurrentBg] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const processRef = useRef(null);
  const navigate = useNavigate(); // ✅ Only declare this once

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentBg((prevIndex) => (prevIndex + 1) % bgImages.length);
        setFadeIn(true);
      }, 500);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleStartPlanning = () => {
    processRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <>
      <Fade in={fadeIn} timeout={1000}>
        <Box
          sx={{
            height: '100vh',
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url('${bgImages[currentBg]}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-image 1s ease-in-out',
          }}
        >
          <Container maxWidth="md">
            <Paper
              elevation={6}
              sx={{
                backdropFilter: 'blur(10px)',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                p: 4,
                textAlign: 'center',
                color: '#fff',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
              }}
            >
              <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                Welcome to Your Travel Planner
              </Typography>
              <Typography variant="h6" sx={{ mb: 4 }}>
                Plan your trips, book accommodations, explore activities, and organize your entire travel experience in one place.
              </Typography>

              <Button
                variant="contained"
                color="primary"
                onClick={handleStartPlanning}
                sx={{ mt: 2, fontWeight: 'bold', mr: 2 }}
              >
                Learn How It Works
              </Button>

              <Button
                variant="contained"
                color="secondary"
                onClick={handleRegisterRedirect}
                sx={{ mt: 2, fontWeight: 'bold' }}
              >
                Start Planning
              </Button>
            </Paper>
          </Container>
        </Box>
      </Fade>

      <About />
      <div ref={processRef}>
        <Process />
      </div>
      <Footer />
    </>
  );
};

export default Home;
