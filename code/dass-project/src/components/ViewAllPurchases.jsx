import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CSS/purchasepage.css";
import img1 from "./CSS/arka_logo.png";
import { motion } from "framer-motion";
import { USER } from "./LoginPage";

export default function ViewAllPurchasePage() {
  const [purchases, setPurchases] = useState([]);
  const [pdfFileName, setPdfFileName] = useState("");
  useEffect(() => {
    async function fetchPurchases() {
      try {
        const purchaseResponse = await axios.get("http://localhost:5000/purchase");
        const pdfResponse = await axios.get("http://localhost:5000/get-files");
        console.log("PDF Response:", pdfResponse.data.data[0].pdf);
        
        const purchasesWithData = purchaseResponse.data.map((purchase, index) => {
          return {
            ...purchase,
            file: pdfResponse.data.data[index]?.pdf || null // Assuming each purchase corresponds to a file in the same order
          };
        });
  
        setPurchases(purchasesWithData);
      } catch (error) {
        console.error("Error fetching purchases:", error);
      }
    }
    fetchPurchases();
  }, []);

  const showPdf = (pdfFileName) => {
    window.open(
      `http://localhost:5000/files/${pdfFileName}`,
      "_blank",
      "norefferer"
    );
  };

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
                  <h1 className="mb-md-5 heading">VIEW ALL PURCHASES</h1>
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th className="table-dark">S. No.</th>
                        <th className="table-dark">Date and Time</th>
                        <th className="table-dark">Team</th>
                        <th className="table-dark fixed-column">
                          Link to Purchase
                        </th>
                        <th className="table-dark">Component Name</th>
                        <th className="table-dark">Quantity</th>
                        <th className="table-dark">Project</th>
                        <th className="table-dark">CHIMS File</th>
                        <th className="table-dark">PO/BOM/Quote File</th>
                        <th className="table-dark">Approval</th>
                        <th className="table-dark">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {purchases.map((purchase, index) => (
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
                            {purchase.quoteFile}
                          </td>
                          <td className="table-secondary">
                            <form>
                              <select
                                className="dropdown"
                                name="approval{index}"
                              >
                                <option value="Choose">Select Option</option>
                                <option value="Yes">Yes</option>
                                <option value="Hold">Hold</option>
                                <option value="Reject">Reject</option>
                              </select>
                            </form>
                          </td>
                          <td className="table-secondary">
                            <button
                              onClick={() => showPdf(purchase.file)}
                              className="btn btn-primary"
                            >
                              View
                            </button>
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
