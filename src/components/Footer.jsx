import React from 'react';
import { Box, Container, Grid, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: '#1a1a1a', color: '#fff', pt: 6, pb: 3, mt: 6 }}>
      <Container>
        <Grid container spacing={4}>
          {/* Column 1 */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Travel Planner
            </Typography>
            <Typography variant="body2">
              Your all-in-one platform to explore, plan, and book your dream trips across the globe. Enjoy a seamless and enriching travel experience.
            </Typography>
          </Grid>

          {/* Column 2 */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Link href="#" color="inherit" underline="hover" display="block">Destinations</Link>
            <Link href="#" color="inherit" underline="hover" display="block">Trip Planner</Link>
            <Link href="#" color="inherit" underline="hover" display="block">Login / Register</Link>
            <Link href="#" color="inherit" underline="hover" display="block">Contact Us</Link>
          </Grid>

          {/* Column 3 */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Contact
            </Typography>
            <Typography variant="body2">📍 123 Explorer Street, Wanderlust City</Typography>
            <Typography variant="body2">📞 +91 98765 43210</Typography>
            <Typography variant="body2">📧 support@travelplanner.com</Typography>
          </Grid>
        </Grid>

        {/* Bottom */}
        <Box textAlign="center" mt={5}>
          <Typography variant="body2" sx={{ color: '#bbb' }}>
            © {new Date().getFullYear()} Travel Planner. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
