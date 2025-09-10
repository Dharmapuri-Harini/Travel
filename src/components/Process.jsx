import React from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';

const steps = [
  { title: "Plan Your Trip", desc: "Choose destinations, dates, and customize your itinerary." },
  { title: "Book Accommodations", desc: "Search and book top-rated hotels, resorts, and stays." },
  { title: "Explore Activities", desc: "Discover attractions and activities tailored to your journey." }
];

const Process = () => (
  <Box sx={{ py: 6, bgcolor: '#f9f9f9' }}>
    <Container>
      <Typography variant="h4" gutterBottom textAlign="left" fontWeight="bold">
        How It Works
      </Typography>
      <Grid container spacing={2}>
        {steps.map((step, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper
              elevation={4}
              sx={{
                p: 4,
                textAlign: 'center',
                borderRadius: 3,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-10px) scale(1.03)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                  backgroundColor: 'cyan'
                }
              }}
            >
              <Typography variant="h6" gutterBottom>{step.title}</Typography>
              <Typography variant="body2">{step.desc}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  </Box>
);

export default Process;
