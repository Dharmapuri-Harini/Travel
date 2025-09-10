import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography, Container } from '@mui/material';

const DestinationDetails = () => {
  const location = useLocation();
  const { destination } = location.state || {};

  if (!destination) {
    return (
      <Container>
        <Typography variant="h5" mt={4}>
          No destination data found.
        </Typography>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url(${destination.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        textShadow: '0 1px 3px rgba(0,0,0,0.6)',
        p: 4,
      }}
    >
      <Box sx={{ backgroundColor: 'rgba(0,0,0,0.6)', p: 4, borderRadius: 3 }}>
        <Typography variant="h3" gutterBottom>
          {destination.name}
        </Typography>
        <Typography variant="h6">
          Detailed info, things to do, and travel tips will go here...
        </Typography>
      </Box>
    </Box>
  );
};

export default DestinationDetails;
