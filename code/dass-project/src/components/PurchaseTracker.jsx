import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CSS/purchasepage.css";
import img1 from "./CSS/arka_logo.png";
import { motion } from "framer-motion";
// import { USER } from "./LoginPage";
import { getUser } from "./LoginPage";
import { useNavigate } from "react-router";

export default function PurchaseTracker() {
  const navigate = useNavigate();
  const [USER, setUSER] = useState(getUser());
  const [selectedProject, setSelectedProject] = useState("");

  

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

  const userPurchases = purchases.filter((purchase) => purchase.user === USER);

  const handleProjectFilterChange = (event) => {
    setSelectedProject(event.target.value);
  };


  const filteredPurchases = selectedProject
  ? userPurchases.filter((purchase) => purchase.project === selectedProject)
  : userPurchases;

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
                  <h1 className="mb-md-5 heading">TRACK YOUR PURCHASES</h1>
                  <div>
                    <label htmlFor="projectFilter">Filter by Project:</label>
                    <select
                      id="projectFilter"
                      value={selectedProject}
                      onChange={handleProjectFilterChange}
                    >
                      <option value="">All Projects</option>
                      {Array.from(
                        new Set(purchases.map((purchase) => purchase.project))
                      ).map((project) => (
                        <option key={project} value={project}>
                          {project}
                        </option>
                      ))}
                    </select>
                  </div>

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
                        <th className="table-dark">Approval</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPurchases.map((purchase, index) => (
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
                            {purchase.approval}
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
