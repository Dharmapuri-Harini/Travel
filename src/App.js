// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Trips from './pages/Trips';
import Accommodation from './pages/Accommodation';
import Activities from './pages/Activities';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import LoginRegister from './pages/LoginRegister';
import Header from './components/Header';
import DestinationDetails from './pages/DestinationDetails';
import Hotels from './pages/Hotels';
import BookingPage from './pages/BookingPage';
import Flights from './pages/Flights';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trips" element={<Trips />} />
        <Route path="/accommodation" element={<Accommodation />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<LoginRegister mode="login" />} />
        <Route path="/destination/:name" element={<DestinationDetails />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/book" element={<BookingPage />} />
        <Route path="/flights" element={<Flights />} /> 
        <Route path="/register" element={<LoginRegister mode="register" />} /> 
      </Routes>
    </>
  );
}

export default App;
