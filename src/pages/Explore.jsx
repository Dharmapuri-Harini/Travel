import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Button,
  CircularProgress,
} from "@mui/material";

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [placeData, setPlaceData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setLoading(true);
    setNotFound(false);
    setPlaceData(null);

    try {
      // Step 1: Search Wikipedia for matching pages
      const searchRes = await axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          list: "search",
          srsearch: `${searchTerm} India`,
          format: "json",
          origin: "*",
        },
      });

      const results = searchRes.data.query.search;
      if (!results.length) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      const pageTitle = results[0].title;

      // Step 2: Get page summary + image
      const pageDataRes = await axios.get(
        `https://en.wikipedia.org/w/api.php`,
        {
          params: {
            action: "query",
            titles: pageTitle,
            prop: "extracts|pageimages",
            exintro: true,
            explaintext: true,
            piprop: "original",
            format: "json",
            origin: "*",
          },
        }
      );

      const pages = pageDataRes.data.query.pages;
      const pageId = Object.keys(pages)[0];
      const page = pages[pageId];

      const description = page.extract || "No description available.";
      const image =
        page.original?.source ||
        "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";

      // Step 3: Store data
      setPlaceData({
        title: pageTitle,
        description,
        image,
      });
    } catch (err) {
      console.error("Error fetching place:", err);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 4,
        backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')`, // Background image URL
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        position: "relative",
      }}
    >
      {/* Dark overlay for readability */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          zIndex: 0,
        }}
      />

      {/* Foreground content */}
      <Box sx={{ zIndex: 1, width: "100%", maxWidth: 900, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom sx={{ color: "white" }}>
          Explore Beautiful Places in India
        </Typography>

        {/* Search Bar */}
        <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
          <TextField
            label="Search a place"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ backgroundColor: "white", borderRadius: 1 }}
          />
          <Button variant="contained" onClick={handleSearch}>
            Search
          </Button>
        </Box>

        {/* Loading Spinner */}
        {loading && <CircularProgress sx={{ color: "white" }} />}

        {/* Not Found Message */}
        {notFound && (
          <Typography color="error" sx={{ backgroundColor: "white", p: 1, borderRadius: 1 }}>
            Sorry, no tourist information found for "{searchTerm}".
          </Typography>
        )}

        {/* Place Info Card */}
        {placeData && (
          <Card sx={{ maxWidth: 800, mx: "auto" }}>
            <CardMedia
              component="img"
              height="400"
              image={placeData.image}
              alt={placeData.title}
            />
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {placeData.title}
              </Typography>
              <Typography variant="body1">{placeData.description}</Typography>
            </CardContent>
          </Card>
        )}
      </Box>
    </Box>
  );
};

export default Explore;
