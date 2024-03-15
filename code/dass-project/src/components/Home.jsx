import React from "react";
import "./CSS/home.css";
// import e from "express";
import img1 from "./company_logo.png";
import {Link} from 'react-router-dom';

export default function Home() {
  return (
    <div className="App">
      <header className="header">
        <div className="header-left">
          <img src={img1} alt="Cogo" className="logo" />
          <h1 className="company-name">Arka Aerospace</h1>
        </div>
        <div className="header-right">
        <Link to="/purchase">
            <button className="button button-large">Purchase a tool</button>
          </Link>
          <span style={{ marginRight: "20px" }}></span>
          <Link to="/viewallpurchase">
            <button className="button button-large">View all the purchase</button>
          </Link>
        </div>
      </header>
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
        <div className="photos">{/* Display photos here */}</div>
      </main>
    </div>
  );
}

// export default Home_Page;
