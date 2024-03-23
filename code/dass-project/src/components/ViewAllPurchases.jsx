import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CSS/purchasepage.css";
import img1 from "./CSS/arka_logo.png";
import { motion } from "framer-motion";
// import { USER } from "./LoginPage";
import { getUser } from "./LoginPage";
import { useNavigate } from "react-router";


export default function ViewAllPurchasePage() {
  const navigate = useNavigate();
  const [USER, setUSER] = useState(getUser());

  useEffect(() => {
    const handleStorageChange = () => {
      setUSER(getUser());
    };

    window.addEventListener("storage", handleStorageChange);

    // Cleanup function
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const [purchases, setPurchases] = useState([]);
  const [pdfFileName, setPdfFileName] = useState("");
  useEffect(() => {
    async function fetchPurchases() {
      try {
        const purchaseResponse = await axios.get("http://localhost:5000/purchase");
        const purchases = purchaseResponse.data.map((purchase) => ({
          ...purchase,
          file: purchase.pdfDetails?.pdf || null,
        }));
    
        setPurchases(purchases);
      } catch (error) {
        console.error("Error fetching purchases:", error);
      }
    }
    fetchPurchases();
  }, []);

  const showPdf = (pdfFileName) => {
    if (pdfFileName) {
      window.open(
        `http://localhost:5000/files/${pdfFileName}`,
        "_blank",
        "noreferrer"
      );
    }
  };

  const handlehomeredirect = () => {
    setTimeout(() => {
      navigate("/home");
    }, 100);
  };

  const handleLogout = () => {
    // setUSER(""); // Update the state to an empty string
    // setROLE("");
    // Remove USER from localStorage

    localStorage.removeItem("USER");
    localStorage.removeItem("ROLE");

    // Redirect to login page
    setTimeout(() => {
      navigate("/");
    }, 800);
  };

  return (
    <>
      <div className="App">
      <header className="header">
        <div onClick={handlehomeredirect} className="header-left">
          <img src={img1} alt="Cogo" className="logo" />
        </div>
        <div className="header-right">
          Hello, {USER}
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
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
                        {/* <th className="table-dark">Approval</th> */}
                        {/* <th className="table-dark">Action</th> */}
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
                          <button
                               onClick={() => showPdf(purchase.pdfDetails?.pdf)}
                              className="btn btn-primary file-btn"
                            >
                              {purchase.chimsFile}
                            </button>
                          </td>
                          <td className="table-secondary">
                            {purchase.quoteFile}
                          </td>
                          {/* <td className="table-secondary">
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
                          </td> */}
                          {/* <td className="table-secondary">
                            <button
                               onClick={() => showPdf(purchase.pdfDetails?.pdf)}
                              className="btn btn-primary"
                            >
                              View
                            </button>
                          </td> */}
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
