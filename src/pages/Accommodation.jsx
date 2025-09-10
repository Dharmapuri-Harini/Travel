import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Box
} from '@mui/material';

const Accommodation = () => {
  const [form, setForm] = useState({
    hotel: '',
    location: '',
    checkIn: '',
    checkOut: '',
    notes: ''
  });

  const [bookings, setBookings] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.hotel || !form.location) return;
    setBookings([...bookings, form]);
    setForm({ hotel: '', location: '', checkIn: '', checkOut: '', notes: '' });
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Accommodation Booking
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
        <TextField
          label="Hotel Name"
          name="hotel"
          value={form.hotel}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Location"
          name="location"
          value={form.location}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Check-In Date"
          name="checkIn"
          type="date"
          value={form.checkIn}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Check-Out Date"
          name="checkOut"
          type="date"
          value={form.checkOut}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Notes"
          name="notes"
          value={form.notes}
          onChange={handleChange}
          multiline
          rows={3}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained">
          Add Booking
        </Button>
      </Box>

      {bookings.map((booking, index) => (
        <Card key={index} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{booking.hotel}</Typography>
            <Typography variant="body2">
              {booking.location} | {booking.checkIn} - {booking.checkOut}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {booking.notes}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default Accommodation;
