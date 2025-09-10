import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/trips';

export const fetchTrips = async () => {
  const res = await axios.get(API_BASE);
  return res.data;
};

export const addTrip = async (tripData) => {
  const res = await axios.post(API_BASE, tripData);
  return res.data;
};
