import React from "react";
import "./CSS/home.css";
// import e from "express";
import img1 from "./CSS/arka_logo.png";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="App">
      <header className="header">
        <div className="header-left">
          <img src={img1} alt="Cogo" className="logo" />
        </div>
        <div className="header-right"></div>
      </header>
      <div className="main-body">
      <Link to="/purchase-page">
        <button className="button purchase-button">Make/View Purchases</button>
      </Link>
      <span style={{ marginRight: "300px" }}></span>
      <Link to="/home">
        <button className="button drone-button" img="./CSS/drone.jpg">Book a slot for Drone Testing</button>
      </Link>
      </div>
      <main className="main-content">
        <h1>About the Company</h1>
        <br />
        <div className="about">
          <p>
            Arka Aerospace is a research-backed technology spin-off from
            Robotics Research Center, IIITH, India. <br />
            Our vision is to become a world-class engineering team in the UAV
            sector.
            <br />
            With a mission to translate advanced UAV R&D into impactful
            products.
            <br />
            Copyright © 2024 Arka Aerospace - All Rights Reserved.
          </p>
        </div>
      </main>
    </div>
  );
}

// export default Home_Page;
