const API_URL = process.env.REACT_APP_API_URL;

export const fetchTrips = async () => {
  const response = await fetch(`${API_URL}/trips`);
  return await response.json();
};

export const addTrip = async (tripData) => {
  const response = await fetch(`${API_URL}/trips`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tripData)
  });
  return await response.json();
};
