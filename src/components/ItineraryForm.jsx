import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const ItineraryForm = ({ onAddTrip }) => {
  const [trip, setTrip] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrip((prevTrip) => ({
      ...prevTrip,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { destination, startDate, endDate, notes } = trip;

    if (!destination || !startDate || !endDate) {
      alert('Please fill in destination, start date, and end date.');
      return;
    }

    // Convert trip to backend-compatible format
    const formattedTrip = {
      destination,
      startDate,
      endDate,
      description: notes || '',
    };

    onAddTrip(formattedTrip);

    // Reset form
    setTrip({
      destination: '',
      startDate: '',
      endDate: '',
      notes: ''
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <TextField
        label="Destination"
        name="destination"
        value={trip.destination}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
        required
      />
      <TextField
        label="Start Date"
        name="startDate"
        type="date"
        value={trip.startDate}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
        InputLabelProps={{ shrink: true }}
        required
      />
      <TextField
        label="End Date"
        name="endDate"
        type="date"
        value={trip.endDate}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
        InputLabelProps={{ shrink: true }}
        required
      />
      <TextField
        label="Notes"
        name="notes"
        value={trip.notes}
        onChange={handleChange}
        multiline
        rows={3}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Add Trip
      </Button>
    </Box>
  );
};

export default ItineraryForm;
