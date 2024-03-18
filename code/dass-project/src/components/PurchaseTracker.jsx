import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CSS/purchasepage.css";
import img1 from "./CSS/arka_logo.png";
import { motion } from "framer-motion";
import { USER } from "./LoginPage";

export default function PurchaseTracker() {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    async function fetchPurchases() {
      try {
        const response = await axios.get("http://localhost:5000/purchase");
        setPurchases(response.data);
      } catch (error) {
        console.error("Error fetching purchases:", error);
      }
    }

    fetchPurchases();
  }, []);

  const userPurchases = purchases.filter((purchase) => purchase.user === USER);

  return (
    <>
      <div className="App">
        <header className="header">
          <div className="header-left">
            <img src={img1} alt="Logo" className="logo" />
          </div>
          <div className="header-right">Hello, {USER}</div>
        </header>

        <motion.div
          className="py-5 h-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="align-center">
            <div className="col-12 col-lg-9 col-xl-7">
              <div className="card" style={{ borderRadius: 30 }}>
                <div className="purchase-form p-md-5">
                  <h1 className="mb-md-5 heading">TRACK YOUR PURCHASES</h1>
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th className="table-dark">S. No.</th>
                        <th className="table-dark">Date and Time</th>
                        <th className="table-dark">Team</th>
                        <th className="table-dark fixed-column">Link to Purchase</th>
                        <th className="table-dark">Component Name</th>
                        <th className="table-dark">Quantity</th>
                        <th className="table-dark">Project</th>
                        <th className="table-dark">CHIMS File</th>
                        <th className="table-dark">PO/BOM/Quote File</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userPurchases.map((purchase, index) => (
                        <tr key={index}>
                          <td className="table-secondary">{index + 1}</td>
                          <td className="table-secondary">{purchase.date}</td>
                          <td className="table-secondary">{purchase.team}</td>
                          <td className="table-secondary fixed-column">
                            {purchase.linkToPurchase}
                          </td>
                          <td className="table-secondary">
                            {purchase.componentName}
                          </td>
                          <td className="table-secondary">
                            {purchase.quantity}
                          </td>
                          <td className="table-secondary">
                            {purchase.project}
                          </td>
                          <td className="table-secondary">
                            {purchase.chimsFile}
                          </td>
                          <td className="table-secondary">
                            {purchase.poBomQuoteFile}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        <main className="main-content">
          <br />
          <footer className="about">
            Copyright © 2024 Arka Aerospace - All Rights Reserved.
          </footer>
        </main>
      </div>
    </>
  );
}
