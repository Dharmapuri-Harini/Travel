import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container, Typography, TextField, Button, Box, Paper
} from '@mui/material';

const BookingPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const hotel = state?.hotel;

  if (!hotel) {
    return (
      <Container sx={{ mt: 5 }}>
        <Typography variant="h5" align="center">
          No hotel selected for booking.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper elevation={4} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Book Your Stay at {hotel.name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Location: {hotel.location}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Price: ₹{hotel.price} / night
        </Typography>

        <Box component="form" sx={{ mt: 3 }}>
          <TextField label="Full Name" fullWidth sx={{ mb: 2 }} />
          <TextField label="Email Address" fullWidth sx={{ mb: 2 }} />
          <TextField label="Check-in Date" type="date" fullWidth sx={{ mb: 2 }} InputLabelProps={{ shrink: true }} />
          <TextField label="Check-out Date" type="date" fullWidth sx={{ mb: 2 }} InputLabelProps={{ shrink: true }} />
          <Button variant="contained" color="primary" fullWidth onClick={() => {
            alert("Booking Confirmed!");
            navigate('/');
          }}>
            Confirm Booking
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default BookingPage;
