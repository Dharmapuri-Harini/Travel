import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  TextField,
  Rating,
  Chip,
  Stack
} from "@mui/material";

const AMENITY_ICONS = {
  "Free Wi-Fi": "📶",
  Pool: "🏊",
  Restaurant: "🍽️",
  Spa: "💆",
  Parking: "🅿️",
  Beach: "🏖️",
  Gym: "💪",
  "River View": "🌊",
  Bar: "🍸",
  Garden: "🌿",
  "Pet Friendly": "🐾",
  "Airport Shuttle": "🛫",
  "Free Breakfast": "🥐"
};

// Top hotels data
const TOP_HOTELS = [ // Mumbai / Maharashtra
  {
    id: "mumbai-1",
    name: "Taj Lands End",
    city: "Mumbai",
    state: "Maharashtra",
    address: "Bandstand, Bandra West, Mumbai 400050",
    rating: 4.4,
    reviews: 5400,
    price: 13500,
    currency: "INR",
    stars: 5,
    amenities: ["Free Wi-Fi", "Pool", "Restaurant", "Gym"],
    image:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/13800523.jpg?k=1e76445218ad2922e520e3a62b1079a3f0d9bb3512fa9d127c3686fab9de60df&o=&hp=1"
  },
  {
    id: "mumbai-2",
    name: "Trident Bandra Kurla",
    city: "Mumbai",
    state: "Maharashtra",
    address: "C-56, G Block, BKC, Bandra East, Mumbai 400051",
    rating: 4.5,
    reviews: 4200,
    price: 12000,
    currency: "INR",
    stars: 5,
    amenities: ["Free Wi-Fi", "Pool", "Spa", "Restaurant"],
    image:
      "https://www.ticati.com/img/hotel/13248208s.jpg"
  },
  {
    id: "mumbai-3",
    name: "The St. Regis Mumbai",
    city: "Mumbai",
    state: "Maharashtra",
    address: "Lower Parel, Mumbai 400013",
    rating: 4.3,
    reviews: 3600,
    price: 14500,
    currency: "INR",
    stars: 5,
    amenities: ["Free Wi-Fi", "Restaurant", "Spa", "Parking"],
    image:
      "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/htl-imgs/20120419160907153-2ac58a7b-15be-4c95-b7d6-1d0b00573ada.jpg"
  },

  // Delhi / NCR
  {
    id: "delhi-1",
    name: "The Leela Palace New Delhi",
    city: "New Delhi",
    state: "Delhi",
    address: "Old Diplomatic Enclave, Chanakyapuri, New Delhi 110023",
    rating: 4.4,
    reviews: 4100,
    price: 14000,
    currency: "INR",
    stars: 5,
    amenities: ["Free Wi-Fi", "Spa", "Restaurant", "Gym"],
    image:
      "https://www.theleela.com/prod/content/assets/aio-banner/dekstop/Hero%202_1920x950.jpg?VersionId=DDUPdZ.f0ciIeURUbOp8CKfERGmBgNUA"
  },
  {
    id: "delhi-2",
    name: "The Lalit New Delhi",
    city: "New Delhi",
    state: "Delhi",
    address: "Barakhamba Avenue, Connaught Place, New Delhi 110001",
    rating: 4.1,
    reviews: 2800,
    price: 7000,
    currency: "INR",
    stars: 5,
    amenities: ["Free Wi-Fi", "Pool", "Restaurant", "Bar"],
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/04/53/a5/d7/the-lalit-new-delhi.jpg?w=900&h=-1&s=1"
  },
  {
    id: "delhi-3",
    name: "ITC Maurya",
    city: "New Delhi",
    state: "Delhi",
    address: "Sardar Patel Marg, Diplomatic Enclave, New Delhi 110021",
    rating: 4.3,
    reviews: 3100,
    price: 12500,
    currency: "INR",
    stars: 5,
    amenities: ["Free Wi-Fi", "Spa", "Restaurant", "Parking"],
    image:
      "https://www.itchotels.com/content/dam/itchotels/in/umbrella/itc/hotels/itcmaurya-new-delhi/images/overview-landing-page/headmast/desktop/exterior-night.png"
  },

  // Bengaluru / Karnataka
  {
    id: "bengaluru-1",
    name: "JW Marriott Bengaluru",
    city: "Bengaluru",
    state: "Karnataka",
    address: "Residency Road, Bengaluru 560025",
    rating: 4.3,
    reviews: 2900,
    price: 9500,
    currency: "INR",
    stars: 5,
    amenities: ["Free Wi-Fi", "Pool", "Gym", "Restaurant"],
    image:
      "https://cache.marriott.com/content/dam/marriott-renditions/BLRJW/blrjw-spice-terrace-3316-hor-clsc.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=750px:*"
  },
  {
    id: "bengaluru-2",
    name: "The Ritz-Carlton, Bengaluru",
    city: "Bengaluru",
    state: "Karnataka",
    address: "Residency Road, Bengaluru 560025",
    rating: 4.2,
    reviews: 2000,
    price: 11000,
    currency: "INR",
    stars: 5,
    amenities: ["Free Wi-Fi", "Spa", "Restaurant", "Gym"],
    image:
      "https://cache.marriott.com/content/dam/marriott-renditions/BLRRZ/blrrz-lobby-0011-hor-clsc.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1200px:*"
  },

  // Chennai / Tamil Nadu
  {
    id: "chennai-1",
    name: "ITC Grand Chola",
    city: "Chennai",
    state: "Tamil Nadu",
    address: "63, Anna Salai, Chennai 600032",
    rating: 4.4,
    reviews: 2300,
    price: 12500,
    currency: "INR",
    stars: 5,
    amenities: ["Free Wi-Fi", "Spa", "Pool", "Restaurant"],
    image:
      "https://www.itchotels.com/content/dam/itchotels/in/umbrella/itc/hotels/itcgrandchola-chennai/images/overview/headmast-desktop/grand-staircase.png"
  },
  {
    id: "chennai-2",
    name: "The Leela Palace Chennai",
    city: "Chennai",
    state: "Tamil Nadu",
    address: "Adyar, Chennai 600028",
    rating: 4.3,
    reviews: 2100,
    price: 11000,
    currency: "INR",
    stars: 5,
    amenities: ["Free Wi-Fi", "Pool", "Restaurant", "Spa"],
    image:
      "https://www.theleela.com/prod/content/assets/aio-banner/dekstop/Hero%202_1920x950_2.jpg?VersionId=BM5iT6rJH0Px9Zp5HbbMoSbduKWKOIJm"
  },

  // Kolkata / West Bengal
  {
    id: "kolkata-1",
    name: "The Oberoi Grand",
    city: "Kolkata",
    state: "West Bengal",
    address: "15 Jawaharlal Nehru Road, Kolkata 700013",
    rating: 4.5,
    reviews: 2500,
    price: 9000,
    currency: "INR",
    stars: 5,
    amenities: ["Free Wi-Fi", "Restaurant", "Spa", "Parking"],
    image:
      "https://www.oberoihotels.com/-/media/oberoi-hotels/website-images/the-oberoi-grand-kolkata/overview/welcome/tog-pool.jpg?w=724&hash=99aaebe23b237059c3306b79b5fa4117"
  },

  // Hyderabad / Telangana
  {
    id: "hyderabad-1",
    name: "Taj Falaknuma Palace",
    city: "Hyderabad",
    state: "Telangana",
    address: "Falaknuma, Hyderabad 500053",
    rating: 4.6,
    reviews: 1800,
    price: 14500,
    currency: "INR",
    stars: 5,
    amenities: ["Free Wi-Fi", "Heritage", "Restaurant", "Spa"],
    image:
      "https://www.americanexpress.com/en-us/travel/discover/photos/101974/20172/1600/Exterior%20Night%201.jpg?ch=560"
  },
  {
    id: "hyderabad-2",
    name: "Taj Krishna",
    city: "Hyderabad",
    state: "Telangana",
    address: "Banjara Hills, Hyderabad 500034",
    rating: 4.2,
    reviews: 1600,
    price: 8500,
    currency: "INR",
    stars: 5,
    amenities: ["Free Wi-Fi", "Pool", "Restaurant", "Gym"],
    image:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/57479183.jpg?k=c4376e1ef939d4e94ca00aafd0d2f8358b65e3d6425857da991535e0c32572d0&o=&hp=1"
  },

  // Goa
  {
    id: "goa-1",
    name: "Taj Exotica Resort & Spa",
    city: "Benaulim",
    state: "Goa",
    address: "Calwaddo, Benaulim, Salcete, Goa 403716",
    rating: 4.4,
    reviews: 4700,
    price: 12500,
    currency: "INR",
    stars: 5,
    amenities: ["Beach", "Pool", "Free Wi-Fi", "Restaurant"],
    image:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/19613751.jpg?k=3fd7be65997f1836b5801388ba2b09968f73722e788eb9fed1ba56610709dfb3&o=&hp=1"
  },
  {
    id: "goa-2",
    name: "W Goa",
    city: "Vagator",
    state: "Goa",
    address: "Vagator, Bardez, Goa 403509",
    rating: 4.2,
    reviews: 2000,
    price: 14000,
    currency: "INR",
    stars: 5,
    amenities: ["Beach", "Pool", "Bar", "Free Wi-Fi"],
    image:
      "https://cache.marriott.com/content/dam/marriott-renditions/GOIWH/goiwh-rockpool-twilight-3537-hor-clsc.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1300px:*"
  },

  // Jaipur / Rajasthan
  {
    id: "jaipur-1",
    name: "Rambagh Palace",
    city: "Jaipur",
    state: "Rajasthan",
    address: "Bhawani Singh Road, Jaipur 302005",
    rating: 4.7,
    reviews: 2100,
    price: 13500,
    currency: "INR",
    stars: 5,
    amenities: ["Free Wi-Fi", "Garden", "Restaurant", "Spa", "Parking"],
    image:
      "https://i.pinimg.com/1200x/2b/65/68/2b6568405bf3c033009c18c621d5350b.jpg"
  },
  {
    id: "jaipur-2",
    name: "Fairmont Jaipur",
    city: "Jaipur",
    state: "Rajasthan",
    address: "Jaipur-Kota Road, Jaipur 303806",
    rating: 4.3,
    reviews: 1700,
    price: 9500,
    currency: "INR",
    stars: 5,
    amenities: ["Pool", "Restaurant", "Free Wi-Fi", "Spa"],
    image:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/17061423.jpg?k=a602c1735b051c67933f216b380b33b7a4ddc3414f830370d0683f57f3b74f1e&o=&hp=1"
  },

  // Udaipur
  {
    id: "udaipur-1",
    name: "Taj Lake Palace",
    city: "Udaipur",
    state: "Rajasthan",
    address: "Lake Pichola, Udaipur 313001",
    rating: 4.6,
    reviews: 1900,
    price: 14500,
    currency: "INR",
    stars: 5,
    amenities: ["Free Wi-Fi", "Pool", "Restaurant", "Spa"],
    image:
      "https://i.ytimg.com/vi/9o57q8KMbPc/sddefault.jpg"
  },

  // Agra / Uttar Pradesh
  {
    id: "agra-1",
    name: "The Oberoi Amarvilas",
    city: "Agra",
    state: "Uttar Pradesh",
    address: "Taj East Gate Road, Agra 282001",
    rating: 4.7,
    reviews: 2400,
    price: 15000,
    currency: "INR",
    stars: 5,
    amenities: ["Free Wi-Fi", "Restaurant", "Spa", "Parking"],
    image:
      "https://i.ytimg.com/vi/f2hMgnReaRs/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLA0qX2ivmMA4fiOLhizH8QbDqmhmw"
  },

  // Pune
  {
    id: "pune-1",
    name: "The Westin Pune Koregaon Park",
    city: "Pune",
    state: "Maharashtra",
    address: "Koregaon Park, Pune 411001",
    rating: 4.3,
    reviews: 1500,
    price: 7000,
    currency: "INR",
    stars: 5,
    amenities: ["Free Wi-Fi", "Gym", "Pool", "Restaurant"],
    image:
      "https://q-xx.bstatic.com/xdata/images/hotel/max500/538764369.jpg?k=4da711e226671576f15a20b7b5b1fe721c95881bf661212ae5552c337a81b777&o="
  },

  // Chandigarh
  {
    id: "chandigarh-1",
    name: "Taj Chandigarh",
    city: "Chandigarh",
    state: "Chandigarh",
    address: "Block No.6, Sector 17, Chandigarh 160017",
    rating: 4.2,
    reviews: 900,
    price: 6000,
    currency: "INR",
    stars: 5,
    amenities: ["Free Wi-Fi", "Restaurant", "Gym"],
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2f/75/a1/de/caption.jpg?w=1200&h=-1&s=1"
  },

  // Lucknow
  {
    id: "lucknow-1",
    name: "Vivanta by Taj - Gomti Nagar",
    city: "Lucknow",
    state: "Uttar Pradesh",
    address: "Gomti Nagar, Lucknow 226010",
    rating: 4.0,
    reviews: 600,
    price: 5000,
    currency: "INR",
    stars: 4,
    amenities: ["Free Wi-Fi", "Restaurant", "Parking"],
    image:
      "https://ik.imgkit.net/3vlqs5axxjf/external/ik-seo/https://www.cfmedia.vfmleonardo.com/imageRepo/1/0/32/875/332/Celsius_-_The_Pool_O/Vivanta-by-Taj--Gomti-Nagar-Pool.jpg?tr=w-780%2Ch-437%2Cfo-auto"
  },

  // Kochi
  {
    id: "kochi-1",
    name: "Brunton Boatyard",
    city: "Kochi",
    state: "Kerala",
    address: "Fort Kochi, Kochi 682001",
    rating: 4.2,
    reviews: 700,
    price: 6500,
    currency: "INR",
    stars: 4,
    amenities: ["Free Wi-Fi", "Restaurant", "Parking"],
    image:
      "https://ik.imgkit.net/3vlqs5axxjf/TW/uploadedImages/All_TW_Art/2017/1030/T1030BRUNTON_HR.jpg?width=168&height=168&mode=crop&Anchor=MiddleCenter&tr=w-1200%2Cfo-auto"
  },

  // Alleppey / Kerala
  {
    id: "alleppey-1",
    name: "Lake Palace Resort",
    city: "Alleppey",
    state: "Kerala",
    address: "Alleppey KSRTC Road, Alleppey, Kerala",
    rating: 4.1,
    reviews: 320,
    price: 4500,
    currency: "INR",
    stars: 4,
    amenities: ["Free Wi-Fi", "Boat Service", "Restaurant"],
    image:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/60572392.jpg?k=fc33a8442fa29caa4bfc47b0843c5aeb043b71dc49f85e2cdc5401aa78b8d09f&o=&hp=1"
  },

  // Varanasi
  {
    id: "varanasi-1",
    name: "Riverside Heritage Hotel",
    city: "Varanasi",
    state: "Uttar Pradesh",
    address: "Assi Ghat Road, Varanasi 221005",
    rating: 4.2,
    reviews: 430,
    price: 3500,
    currency: "INR",
    stars: 3,
    amenities: ["Free Wi-Fi", "Restaurant", "River View"],
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/ab/2d/6f/evenings-in-the-garden.jpg?w=900&h=500&s=1"
  },

  // Amritsar
  {
    id: "amritsar-1",
    name: "ITC Mughal",
    city: "Amritsar",
    state: "Punjab",
    address: "Tarn Taran Rd, Amritsar 143006",
    rating: 4.3,
    reviews: 1100,
    price: 8000,
    currency: "INR",
    stars: 5,
    amenities: ["Free Wi-Fi", "Restaurant", "Spa"],
    image:
      "https://www.itchotels.com/content/dam/itchotels/in/umbrella/itc/hotels/itcmughal-agra/images/overview-landing-page/headmast/desktop/pool.png"
  },

  // Shimla
  {
    id: "shimla-1",
    name: "Wildflower Hall",
    city: "Shimla",
    state: "Himachal Pradesh",
    address: "Chharabra, Shimla 171004",
    rating: 4.5,
    reviews: 900,
    price: 14000,
    currency: "INR",
    stars: 5,
    amenities: ["Free Wi-Fi", "Spa", "Restaurant"],
    image:
      "https://images.assettype.com/nationalherald/2024-02/b0b148b6-356f-48ac-a06d-b3702b3bb04b/wildflower.jpg"
  },

  // Ludhiana
  {
    id: "ludhiana-1",
    name: "Hotel Park Plaza Ludhiana",
    city: "Ludhiana",
    state: "Punjab",
    address: "B R B B Avenue, Ludhiana",
    rating: 4.0,
    reviews: 240,
    price: 4200,
    currency: "INR",
    stars: 4,
    amenities: ["Free Wi-Fi", "Restaurant", "Parking"],
    image:
      "https://content.skyscnr.com/available/1940811716/1940811716_WxH.jpg"
  },

  // Nashik
  {
    id: "nashik-1",
    name: "Ramada by Wyndham Nashik",
    city: "Nashik",
    state: "Maharashtra",
    address: "Trimbak Road, Nashik",
    rating: 4.0,
    reviews: 300,
    price: 3500,
    currency: "INR",
    stars: 4,
    amenities: ["Free Wi-Fi", "Restaurant", "Parking"],
    image:
      "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/htl-imgs/202205081616112476-9bab9ebe1cb911ed9db30a58a9feac02.jpg"
  },

  // Kochi (additional)
  {
    id: "kochi-2",
    name: "Fort House",
    city: "Kochi",
    state: "Kerala",
    address: "Fort Kochi, Kochi 682001",
    rating: 4.1,
    reviews: 220,
    price: 3200,
    currency: "INR",
    stars: 3,
    amenities: ["Free Wi-Fi", "Restaurant"],
    image:
      "https://r1imghtlak.mmtcdn.com/bf2d64a6-e492-42e0-a027-31eeb16a639d.jpeg?&output-quality=75&downsize=375:218&crop=375:218;25,0&output-format=jpg"
  },

  // Madurai
  {
    id: "madurai-1",
    name: "Heritage Madurai",
    city: "Madurai",
    state: "Tamil Nadu",
    address: "Veli St, Madurai 625001",
    rating: 4.0,
    reviews: 180,
    price: 2200,
    currency: "INR",
    stars: 3,
    amenities: ["Free Wi-Fi", "Restaurant"],
    image:
      "https://media.audleytravel.com/-/media/images/home/indian-subcontinent/india/accommodation/superhotels/the_heritage_madurai_423517.jpg?q=79&w=1920&h=685"
  },

  // Mysore
  {
    id: "mysore-1",
    name: "Royal Orchid Metropole",
    city: "Mysore",
    state: "Karnataka",
    address: "Saraswathipuram, Mysore 570009",
    rating: 4.1,
    reviews: 310,
    price: 4200,
    currency: "INR",
    stars: 4,
    amenities: ["Free Wi-Fi", "Restaurant", "Parking"],
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/30/05/2d/85/outside-view.jpg?w=900&h=500&s=1"
  },

  // Shillong
  {
    id: "shillong-1",
    name: "The Heritage Club - Tripura Castle",
    city: "Shillong",
    state: "Meghalaya",
    address: "Happy Valley Road, Shillong",
    rating: 4.0,
    reviews: 120,
    price: 4800,
    currency: "INR",
    stars: 4,
    amenities: ["Free Wi-Fi", "Restaurant", "Parking"],
    image:
      "https://r1imghtlak.mmtcdn.com/e9808014402b11ee8eae0a58a9feac02.jpg"
  },

  // Rishikesh
  {
    id: "rishikesh-1",
    name: "Aloha on the Ganges",
    city: "Rishikesh",
    state: "Uttarakhand",
    address: "Laxman Jhula Rd, Rishikesh",
    rating: 4.2,
    reviews: 430,
    price: 3500,
    currency: "INR",
    stars: 4,
    amenities: ["Free Wi-Fi", "Restaurant", "River View"],
    image:
      "https://assets.simplotel.com/simplotel/image/upload/x_0,y_78,w_1500,h_843,r_0,c_crop,q_80,fl_progressive/w_900,f_auto,c_fit/aloha-on-the-ganges/_MG_4074_z0xyjs_zfjeyn_1_rjkl3r"
  },

  // Leh
  {
    id: "leh-1",
    name: "The Grand Dragon Ladakh",
    city: "Leh",
    state: "Ladakh",
    address: "Rinchenling Hospitality, Leh",
    rating: 4.2,
    reviews: 210,
    price: 7500,
    currency: "INR",
    stars: 4,
    amenities: ["Free Wi-Fi", "Restaurant", "Parking"],
    image:
      "https://www.thegranddragonladakh.com/assets/images/home-banner.jpg"
  },

  // Ooty
  {
    id: "ooty-1",
    name: "Savoy - IHCL SeleQtions",
    city: "Ooty",
    state: "Tamil Nadu",
    address: "Charing Cross, Ooty 643001",
    rating: 4.1,
    reviews: 320,
    price: 6000,
    currency: "INR",
    stars: 4,
    amenities: ["Free Wi-Fi", "Restaurant", "Garden"],
    image:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/254172471.jpg?k=35d6a8f3e65ca4075db5b1ae12630584370b14e78d8c94520f06bf4043674fac&o=&hp=1"
  },

  // Kodaikanal
  {
    id: "kodaikanal-1",
    name: "The Carlton",
    city: "Kodaikanal",
    state: "Tamil Nadu",
    address: "Peshawar Rd, Kodaikanal 624101",
    rating: 4.0,
    reviews: 190,
    price: 4200,
    currency: "INR",
    stars: 3,
    amenities: ["Free Wi-Fi", "Restaurant"],
    image:
      "https://assets.simplotel.com/simplotel/image/upload/x_0,y_0,w_1650,h_928,r_0,c_crop,q_92,fl_progressive/w_900,f_auto,c_fit/the-carlton/The_Carlton_3"
  },

  // Darjeeling
  {
    id: "darjeeling-1",
    name: "Mayfair Darjeeling",
    city: "Darjeeling",
    state: "West Bengal",
    address: "Lebong Cart Rd, Darjeeling 734104",
    rating: 4.2,
    reviews: 250,
    price: 5600,
    currency: "INR",
    stars: 4,
    amenities: ["Free Wi-Fi", "Restaurant", "Garden"],
    image:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/209359463.jpg?k=02d4eba132cae5eed7926c0a5130cf43c793a707400d394b720dd951f1c2c4ec&o=&hp=1"
  },

  // Additional metros & popular cities
  {
    id: "surat-1",
    name: "The Grand Bhagwati",
    city: "Surat",
    state: "Gujarat",
    address: "Mota Varachha, Surat",
    rating: 4.0,
    reviews: 260,
    price: 3800,
    currency: "INR",
    stars: 4,
    amenities: ["Free Wi-Fi", "Restaurant", "Parking"],
    image:
      "https://www.thegrandbhagwati.com/assets/img/overview/stay.jpg?v=2.1"
  },
  {
    id: "indore-1",
    name: "Sayaji Indore",
    city: "Indore",
    state: "Madhya Pradesh",
    address: "Ab Road, Indore",
    rating: 4.0,
    reviews: 420,
    price: 3800,
    currency: "INR",
    stars: 4,
    amenities: ["Free Wi-Fi", "Pool", "Restaurant"],
    image:
      "https://sayajihotels.com/images/hotels/Sayaji%20Indore/Places/Mediterra.webp"
  },
  {
    id: "bhubaneswar-1",
    name: "Mayfair Lagoon",
    city: "Bhubaneswar",
    state: "Odisha",
    address: "Chandrasekharpur, Bhubaneswar",
    rating: 4.1,
    reviews: 300,
    price: 5000,
    currency: "INR",
    stars: 5,
    amenities: ["Free Wi-Fi", "Pool", "Restaurant"],
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/23/19/07/5c/mayfair-lagoon.jpg?w=900&h=500&s=1"
  },
  {
   id: "visakhapatnam-1",
  name: "Novotel Visakhapatnam Varun Beach",
  city: "Visakhapatnam",
  state: "Andhra Pradesh",
  address: "Beach Road, Visakhapatnam",
  rating: 4.6,
  reviews: 35400,
  price: 15284,
  currency: "INR",
  stars: 5,
  amenities: [
    "Free parking",
    "Breakfast (₹)",
    "Free Wi-Fi",
    "Air conditioning",
    "Pools",
    "Fitness centre",
    "Hot tub",
    "Spa"
  ],
  image:
    "https://images.trvl-media.com/lodging/26000000/25010000/25004900/25004850/6a880c53.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill"
  },
  {
    id: "tirupati-1",
  name: "Taj Tirupati",
  city: "Tirupati",
  state: "Andhra Pradesh",
  address: "Near Kapila Theertham, Tirupati",
  rating: 4.5,
  reviews: 3800,
  price: 16346,
  currency: "INR",
  stars: 5,
  amenities: [
    "Free parking",
    "Free breakfast",
    "Free Wi-Fi",
    "Air conditioning",
    "Pool",
    "Restaurant",
    "Room service",
    "Spa"
  ],
  image:
    "https://image.wedmegood.com/resized/720X/uploads/member/1172663/1585821618_Screenshot_from_2020_04_02_15_21_19.png"
  },
  {
     id: "visakhapatnam-2",
  name: "Radisson Blu Resort Visakhapatnam",
  city: "Visakhapatnam",
  state: "Andhra Pradesh",
  address: "Rushikonda Beach, Visakhapatnam",
  rating: 4.7,
  reviews: 6400,
  price: 23694,
  currency: "INR",
  stars: 5,
  amenities: [
    "Breakfast (₹)",
    "Free Wi-Fi",
    "Spa"
  ],
  image:
    "https://images.trvl-media.com/lodging/70000000/69330000/69323700/69323669/9a3c0021.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill"
  }
];

  
export default function Hotels() {
  const [query, setQuery] = useState("");
  const [bookedIds, setBookedIds] = useState(new Set());
  const [selected, setSelected] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hotels, setHotels] = useState(TOP_HOTELS); // Initialize with TOP_HOTELS

  // Fetch hotels from API
  useEffect(() => {
    axios.get("http://localhost:5000/api/hotels")
      .then(res => {
        setHotels(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to load hotels");
        setLoading(false);
      });
  }, []);

  // Filter hotels based on query
  const filteredHotels = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return [...hotels].sort((a, b) => b.rating - a.rating);
    }
    return hotels.filter(
      (h) =>
        h.city.toLowerCase().includes(q) ||
        h.state.toLowerCase().includes(q) ||
        h.name.toLowerCase().includes(q)
    ).sort((a, b) => b.rating - a.rating);
  }, [query, hotels]);

  const handleOpen = (hotel) => setSelected(hotel);
  const handleClose = () => setSelected(null);

  const handleBookNow = (hotel) => {
    setBookedIds((prev) => new Set(prev).add(hotel.id));
    setSnackbarOpen(true);
    handleClose();
  };

  const formatPrice = (num, currency = "INR") => {
    try {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency
      }).format(num);
    } catch {
      return `${currency} ${num}`;
    }
  };

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Craft Your Stay
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "center",
          mb: 4,
          flexWrap: "wrap"
        }}
      >
        <TextField
          label="Search city or state"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{ width: { xs: "100%", sm: 520 } }}
          variant="outlined"
        />
      </Box>

      <Grid container spacing={3}>
        {filteredHotels.length === 0 ? (
          <Grid item xs={12}>
            <Typography align="center">No hotels found for "{query}"</Typography>
          </Grid>
        ) : (
          filteredHotels.map((hotel) => (
            <Grid item xs={12} md={6} key={hotel.id}>
              <Card
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "stretch",
                  cursor: "pointer",
                  "&:hover": { boxShadow: 6 }
                }}
                onClick={() => handleOpen(hotel)}
              >
                <CardMedia
                  component="img"
                  sx={{ width: 320, objectFit: "cover" }}
                  image={hotel.image}
                  alt={hotel.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/600x400?text=Hotel+Image";
                  }}
                />
                <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                  <CardContent sx={{ flex: 1 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 2 }}>
                      <Box>
                        <Typography variant="h6">{hotel.name}</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                          {hotel.city}, {hotel.state}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                          <Rating value={hotel.rating / 1} precision={0.1} readOnly size="small" />
                          <Typography variant="body2" color="text.secondary">
                            {hotel.rating.toFixed(1)} ({hotel.reviews})
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={{ textAlign: "right" }}>
                        <Chip
                          label={`${hotel.stars}-star`}
                          size="small"
                          color="primary"
                          sx={{ mb: 1 }}
                        />
                        <Typography variant="h6" sx={{ color: "success.main", mt: 1 }}>
                          {formatPrice(hotel.price, hotel.currency)}
                        </Typography>
                        {bookedIds.has(hotel.id) && (
                          <Chip label="BOOKED" color="success" size="small" sx={{ mt: 1 }} />
                        )}
                      </Box>
                    </Box>

                    <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: "wrap" }}>
                      {hotel.amenities.slice(0, 5).map((a) => (
                        <Chip key={a} size="small" label={`${AMENITY_ICONS[a] || ""} ${a}`} />
                      ))}
                    </Stack>
                  </CardContent>

                  <CardActions sx={{ px: 2, pb: 2 }}>
                    <Button variant="outlined" onClick={(e) => { e.stopPropagation(); handleOpen(hotel); }}>
                      View details
                    </Button>
                    <Button
                      variant="contained"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookNow(hotel);
                      }}
                      sx={{ ml: "auto" }}
                    >
                      Book Now
                    </Button>
                  </CardActions>
                </Box>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* Dialog / modal for details */}
      <Dialog open={!!selected} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{selected?.name}</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box component="img"
                src={selected?.image}
                alt={selected?.name}
                sx={{ width: "100%", borderRadius: 1 }}
                onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/800x500?text=Hotel+Image"; }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                {selected?.city}, {selected?.state}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {selected?.address || "Address not available"}
              </Typography>

              <Typography variant="body2" sx={{ mb: 1 }}>Rating: {selected?.rating} ({selected?.reviews} reviews)</Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>Price: {selected ? formatPrice(selected.price, selected.currency) : ""}</Typography>

              <Typography variant="subtitle2" sx={{ mb: 1 }}>Amenities:</Typography>
              <Stack direction="column" spacing={1}>
                {selected?.amenities?.map((a) => (
                  <Typography key={a} variant="body2">{AMENITY_ICONS[a] || "•"} {a}</Typography>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button variant="contained" onClick={() => { selected && handleBookNow(selected); }}>
            Book Now
          </Button>
        </DialogActions>
      </Dialog>

      {/* Booked snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2200}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Hotel is booked successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
}
