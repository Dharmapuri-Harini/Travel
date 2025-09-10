import React from 'react';
import { Box, Container, Grid, Typography, Button } from '@mui/material';

const About = () => {
  return (
    <Box sx={{ py: 8, bgcolor: '#f9f9f9' }}>
      <Container className='flex flex-row'>
        <Grid container spacing={5} alignItems="">
          {/* Left: Image */}
          <Grid item xs={12} md={6}>
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
              alt="Travel"
              style={{ width: '50%', borderRadius: '12px', boxShadow: '0 8px 20px rgba(0,0,0,0.15)' }}
            />
          </Grid>

          {/* Right: Text Content */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom fontWeight="bold">
              Discover the World with Travel Planner
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
              We’re dedicated to helping you craft the perfect adventure. From weekend getaways to month-long explorations, our platform makes it easy to plan every detail — flights, hotels, activities, and more.
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
              Whether you're planning a honeymoon, a solo trip, or a family vacation, Travel Planner ensures a smooth and unforgettable journey with real-time travel data and easy itinerary creation.
            </Typography>
            <Button variant="contained" color="primary">
              Start Planning
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;
