import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const TripCard = ({ trip }) => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{trip.destination}</Typography>
        <Typography variant="body2">
          {trip.startDate} to {trip.endDate}
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          {trip.notes}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TripCard;
