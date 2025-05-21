import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Features from "../components//Features";
import Testimonials from "../components/Testimonials";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
// import logo from "../assets/logo.png"; // Replace with your actual logo path

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Testimonials />
      <Footer />
    </>
  );
};

export default LandingPage;
