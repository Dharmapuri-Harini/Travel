// src/components/HotelCard.jsx
import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Rating,
  Chip,
  Stack,
} from "@mui/material";

const HotelCard = ({
  hotel,
  onViewDetails,
  onBookNow,
}) => {
  return (
    <Card sx={{ maxWidth: 345, borderRadius: 3, boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="180"
        image={hotel.image}
        alt={hotel.name}
        sx={{ objectFit: "cover" }}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {hotel.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {hotel.location}
        </Typography>
        <Rating value={hotel.rating} precision={0.5} readOnly size="small" />
        <Typography variant="body1" color="primary" sx={{ mt: 1, fontWeight: "bold" }}>
          ₹{hotel.price} / night
        </Typography>
        {hotel.amenities && (
          <Stack direction="row" spacing={0.5} sx={{ mt: 1, flexWrap: "wrap" }}>
            {hotel.amenities.slice(0, 3).map((amenity, idx) => (
              <Chip
                key={idx}
                label={amenity}
                size="small"
                variant="outlined"
              />
            ))}
            {hotel.amenities.length > 3 && (
              <Chip
                label={`+${hotel.amenities.length - 3} more`}
                size="small"
                variant="outlined"
              />
            )}
          </Stack>
        )}
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => onViewDetails(hotel)}>
          View Details
        </Button>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={() => onBookNow(hotel)}
        >
          Book Now
        </Button>
      </CardActions>
    </Card>
  );
};

export default HotelCard;
