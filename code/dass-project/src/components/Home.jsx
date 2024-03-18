import React from "react";
import "./CSS/home.css";
// import e from "express";
import img1 from "./CSS/arka_logo.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { USER } from "./LoginPage";

export default function Home() {
  return (
    <div className="App">
      <header className="header">
        <div className="header-left">
          <img src={img1} alt="Cogo" className="logo" />
        </div>
        <div className="header-right">Hello, {USER}</div>
      </header>
      <motion.div
        className="main-body"
        initial={{ height: 0 }}
        animate={{ height: "100%" }}
        exit={{ y: window.innerHeight, transition: {duration: 0.5} }}
      >
        <Link to="/purchase-page">
          <button className="button purchase-button">
            Make/View Purchases
          </button>
        </Link>
        <span style={{ marginRight: "300px" }}></span>
        <Link to="/home">
          <button className="button drone-button" img="./CSS/drone.jpg">
            Book a slot for Drone Testing
          </button>
        </Link>
      </motion.div>
      <main className="main-content">
        <br />
        <footer className="about">
          Copyright © 2024 Arka Aerospace - All Rights Reserved.
        </footer>
      </main>
    </div>
  );
}

// export default Home_Page;
