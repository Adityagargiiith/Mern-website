import React from 'react';
import "./CSS/home.css";
import img1 from "./CSS/arka_logo.png";
import { Link } from "react-router-dom";

export default function PurchaseOptions() {
    return (
        <div className="App">
      <header className="header">
        <div className="header-left">
          <img src={img1} alt="Cogo" className="logo" />
        </div>
        <div className="header-right"></div>
      </header>
      <div className="main-body">
      <Link to="/purchase">
        <button className="button purchase-form-button">Make a Purchase</button>
      </Link>
      <span style={{ marginRight: "150px" }}></span>
      <Link to="/viewallpurchase">
        <button className="button drone-button" img="./CSS/drone.jpg">View all Purchases</button>
      </Link>
      <span style={{ marginRight: "150px" }}></span>
      <Link to="/purchasetracker">
        <button className="button drone-button" img="./CSS/drone.jpg">Track your Purchases</button>
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