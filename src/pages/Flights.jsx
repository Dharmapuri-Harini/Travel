import React, { useState } from "react";
import {
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Autocomplete,
  TextField,
} from "@mui/material";

// Background image URL
const backgroundImageUrl =
  "https://i.pinimg.com/1200x/03/46/20/034620c6beb8ba2b4180e4629767bf57.jpg";

// List of major Indian airports with city and IATA code
const airports = [
  { city: "Ahmedabad", iata: "AMD" },
  { city: "Amritsar", iata: "ATQ" },
  { city: "Aurangabad", iata: "IXU" },
  { city: "Bengaluru", iata: "BLR" },
  { city: "Bhubaneswar", iata: "BBI" },
  { city: "Chandigarh", iata: "IXC" },
  { city: "Chennai", iata: "MAA" },
  { city: "Coimbatore", iata: "CJB" },
  { city: "Delhi", iata: "DEL" },
  { city: "Dibrugarh", iata: "DIB" },
  { city: "Goa", iata: "GOI" },
  { city: "Guwahati", iata: "GAU" },
  { city: "Hyderabad", iata: "HYD" },
  { city: "Imphal", iata: "IMF" },
  { city: "Indore", iata: "IDR" },
  { city: "Jaipur", iata: "JAI" },
  { city: "Jammu", iata: "IXJ" },
  { city: "Jodhpur", iata: "JDH" },
  { city: "Kannur", iata: "CNN" },
  { city: "Kanpur", iata: "KNU" },
  { city: "Kochi", iata: "COK" },
  { city: "Kolkata", iata: "CCU" },
  { city: "Lucknow", iata: "LKO" },
  { city: "Madurai", iata: "IXM" },
  { city: "Mangalore", iata: "IXE" },
  { city: "Mumbai", iata: "BOM" },
  { city: "Nagpur", iata: "NAG" },
  { city: "Patna", iata: "PAT" },
  { city: "Port Blair", iata: "IXZ" },
  { city: "Pune", iata: "PNQ" },
  { city: "Raipur", iata: "RPR" },
  { city: "Ranchi", iata: "IXR" },
  { city: "Srinagar", iata: "SXR" },
  { city: "Surat", iata: "STV" },
  { city: "Tiruchirappalli", iata: "TRZ" },
  { city: "Varanasi", iata: "VNS" },
  { city: "Visakhapatnam", iata: "VTZ" },
];

// Airlines
const airlines = [
  "IndiGo",
  "Air India",
  "SpiceJet",
  "GoAir",
  "Vistara",
  "AirAsia India",
];

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const generateFlightNumber = (airline) => {
  const prefixMap = {
    IndiGo: "6E",
    "Air India": "AI",
    SpiceJet: "SG",
    GoAir: "G8",
    Vistara: "UK",
    "AirAsia India": "I5",
  };
  const prefix = prefixMap[airline] || "XX";
  const num = randomInt(100, 999);
  return `${prefix}-${num}`;
};

const formatTime = (date) =>
  date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const generateFlights = (from, to) => {
  const flightsCount = randomInt(2, 5);
  const flights = [];

  for (let i = 0; i < flightsCount; i++) {
    const airline = airlines[randomInt(0, airlines.length - 1)];
    const flightNumber = generateFlightNumber(airline);
    const depHour = randomInt(6, 20);
    const depMinute = randomInt(0, 59);
    const departure = new Date();
    departure.setHours(depHour, depMinute, 0, 0);

    const durationMinutes = randomInt(60, 180);
    const arrival = new Date(departure.getTime() + durationMinutes * 60000);

    flights.push({
      airline,
      flightNumber,
      origin: from.iata,
      destination: to.iata,
      departure,
      arrival,
      durationMinutes,
      status: "Scheduled",
    });
  }

  return flights;
};

export default function Flights() {
  const [fromCity, setFromCity] = useState(null);
  const [toCity, setToCity] = useState(null);
  const [flights, setFlights] = useState([]);

  const handleSearch = () => {
    if (!fromCity || !toCity) {
      alert("Please select both From and To cities.");
      return;
    }
    if (fromCity.iata === toCity.iata) {
      alert("From and To cities must be different.");
      return;
    }
    const generatedFlights = generateFlights(fromCity, toCity);
    setFlights(generatedFlights);
  };

  const handleBookNow = async (flightNumber) => {
    alert(`Flight ${flightNumber} booked successfully!`);

    const token = localStorage.getItem("token");
    const tripId = localStorage.getItem("tripId");
    if (!token || !tripId) {
      console.error("Missing token or tripId");
      return;
    }

    const selectedFlight = flights.find(f => f.flightNumber === flightNumber);
    if (!selectedFlight) return;

    try {
      await fetch(`http://localhost:5000/api/trips/${tripId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          flights: [...flights, selectedFlight]
        })
      });
    } catch (err) {
      console.error("Error saving flight:", err);
    }
  };

  const getDurationString = (minutes) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: 4,
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: "white", textShadow: "2px 2px 5px black" }}
      >
        Search Flights in India
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 4,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Autocomplete
          options={airports}
          getOptionLabel={(option) => option.city}
          sx={{ width: 250, backgroundColor: "white", borderRadius: 1 }}
          value={fromCity}
          onChange={(e, newValue) => setFromCity(newValue)}
          renderInput={(params) => <TextField {...params} label="From City" />}
        />
        <Autocomplete
          options={airports}
          getOptionLabel={(option) => option.city}
          sx={{ width: 250, backgroundColor: "white", borderRadius: 1 }}
          value={toCity}
          onChange={(e, newValue) => setToCity(newValue)}
          renderInput={(params) => <TextField {...params} label="To City" />}
        />
        <Button variant="contained" onClick={handleSearch} sx={{ height: 56 }}>
          Search
        </Button>
      </Box>

      {flights.length === 0 && (
        <Typography
          variant="body1"
          textAlign="center"
          sx={{ color: "white", textShadow: "1px 1px 3px black" }}
        >
          No flights to show. Please search above.
        </Typography>
      )}

      {flights.map((flight, i) => (
        <Card
          key={i}
          sx={{
            mb: 2,
            width: "100%",
            maxWidth: 500,
            backgroundColor: "rgba(255,255,255,0.9)",
          }}
        >
          <CardContent>
            <Typography variant="h6">
              {flight.airline} - {flight.flightNumber}
            </Typography>
            <Typography>
              From: {fromCity.city} ({flight.origin})
            </Typography>
            <Typography>
              To: {toCity.city} ({flight.destination})
            </Typography>
            <Typography>
              Departure: {formatTime(flight.departure)}
            </Typography>
            <Typography>Arrival: {formatTime(flight.arrival)}</Typography>
            <Typography>
              Duration: {getDurationString(flight.durationMinutes)}
            </Typography>
            <Typography>Status: {flight.status}</Typography>
            <Button
              variant="outlined"
              sx={{ mt: 2 }}
              onClick={() => handleBookNow(flight.flightNumber)}
            >
              Book Now
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
