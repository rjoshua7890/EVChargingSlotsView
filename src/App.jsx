import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import UserLogin from './UserLogin';
import AdminRegister from './AdminRegister';
import UserRegister from './UserRegister';
import CreateBunk from './CreateBunk';
import ManageBunks from './ManageBunk';
import ManageSlots from './ManageSlots';
import SearchNearbyBunks from './SearchNearbyBunks';
import ViewBunkDetails from './ViewBunkDetails';
import ViewSlotVacancy from './ViewSlotVacancy';
import Home from './Home';
import Navbar from './Navbar';
import Footer from './Footer'
import Map from './Map';

const App = () => {
  return (
    <>
    <Router>
      <Routes>
      <Route path="/map" element={<Map />} />
      <Route path="/" element={<Navbar />} />
      <Route path="/home" element={<Home />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/create-bunk" element={<CreateBunk />} />
        <Route path="/admin/manage-bunks" element={<ManageBunks />} />
        <Route path="/admin/manage-slots" element={<ManageSlots />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/search-nearby-bunks" element={<SearchNearbyBunks />} />
        <Route path="/view-bunk-details" element={<ViewBunkDetails />} />
        <Route path="/view-slots" element={<ViewSlotVacancy />} />
        </Routes>
    </Router>
    <Footer />
    </>
  );
};

export default App;
