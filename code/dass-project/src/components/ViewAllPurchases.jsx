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
  const [editingRemarks, setEditingRemarks] = useState({});
  const [editingBillNos, setEditingBillNos] = useState({});
  const [editingTrackingNos, setEditingTrackingNos] = useState({});

  useEffect(() => {
    async function fetchPurchases() {
      try {
        const purchaseResponse = await axios.get(
          "http://localhost:5000/purchase"
        );
        const purchases = purchaseResponse.data.map((purchase) => ({
          ...purchase,
          file: purchase.pdfDetails?.pdf || null,
        }));
        // purchases = purchases.sort((a, b) => new Date(b.date) - new Date(a.date));
        purchases.sort((a, b) => new Date(b.date) - new Date(a.date));

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
  const handleRemarkChange = (index, newRemark) => {
    setEditingRemarks((prevRemarks) => ({
      ...prevRemarks,
      [index]: newRemark,
    }));
  };

  const handleRemarkSubmit = async (index, purchaseId) => {
    try {
      const newRemark = editingRemarks[index];
      await axios.put(`http://localhost:5000/purchase/${purchaseId}/remark`, {
        remark: newRemark,
      });
      setEditingRemarks((prevRemarks) => ({
        ...prevRemarks,
        [index]: undefined,
      }));

      // Refetch the purchases data
      const purchaseResponse = await axios.get(
        "http://localhost:5000/purchase"
      );
      const purchases = purchaseResponse.data.map((purchase) => ({
        ...purchase,
        file: purchase.pdfDetails?.pdf || null,
      }));

      setPurchases(purchases);
    } catch (error) {
      console.error("Error updating remark:", error);
    }
  };

  const handleBillNoChange = (index, newBillNo) => {
    setEditingBillNos((prevBillNos) => ({
      ...prevBillNos,
      [index]: newBillNo,
    }));
  };

  const handleBillNoSubmit = async (index, purchaseId) => {
    try {
      const newBillNo = editingBillNos[index];
      await axios.put(`http://localhost:5000/purchase/${purchaseId}/BillNo`, {
        BillNo: newBillNo,
      });
      setEditingBillNos((prevBillNos) => ({
        ...prevBillNos,
        [index]: undefined,
      }));

      const purchaseResponse = await axios.get(
        "http://localhost:5000/purchase"
      );
      const purchases = purchaseResponse.data.map((purchase) => ({
        ...purchase,
        file: purchase.pdfDetails?.pdf || null,
      }));

      setPurchases(purchases);
    } catch (error) {
      console.error("Error updating remark:", error);
    }
  };

  const handleTrackingNoChange = (index, newTrackingNo) => {
    setEditingTrackingNos((prevTrackingNos) => ({
      ...prevTrackingNos,
      [index]: newTrackingNo,
    }));
  };

  const handleTrackingNoSubmit = async (index, purchaseId) => {
    try {
      const newTrackingNo = editingTrackingNos[index];
      await axios.put(
        `http://localhost:5000/purchase/${purchaseId}/TrackingNo`,
        {
          TrackingNo: newTrackingNo,
        }
      );
      setEditingTrackingNos((prevTrackingNos) => ({
        ...prevTrackingNos,
        [index]: undefined,
      }));

      // Refetch the purchases data
      const purchaseResponse = await axios.get(
        "http://localhost:5000/purchase"
      );
      const purchases = purchaseResponse.data.map((purchase) => ({
        ...purchase,
        file: purchase.pdfDetails?.pdf || null,
      }));

      setPurchases(purchases);
    } catch (error) {
      console.error("Error updating TrackingNo:", error);
    }
  };

  const handleApprovalChange = async (index, newApproval, purchaseId) => {
    try {
      await axios.put(`http://localhost:5000/purchase/${purchaseId}/approval`, {
        approval: newApproval,
      });

      // Optionally, you can refetch the purchases data to reflect the updated approval status
      const purchaseResponse = await axios.get(
        "http://localhost:5000/purchase"
      );
      const purchasesData = purchaseResponse.data;

      // Sort the purchasesData array by date in descending order (newest to oldest)
      purchasesData.sort((a, b) => new Date(b.date) - new Date(a.date));
      const purchases = purchaseResponse.data.map((purchase) => ({
        ...purchase,
        file: purchase.pdfDetails?.pdf || null,
      }));

      setPurchases(purchases);
    } catch (error) {
      console.error("Error updating approval:", error);
    }
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
                        <th className="table-dark">Order No</th>
                        <th className="table-dark">Approval</th>
                        <th className="table-dark">Bill/Invoice No.</th>
                        <th className="table-dark">Tracking No.</th>

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
                          <td className="table-secondary">
                            {editingRemarks[index] !== undefined ? (
                              <div>
                                <input
                                  type="text"
                                  value={editingRemarks[index] || ""}
                                  onChange={(e) =>
                                    handleRemarkChange(index, e.target.value)
                                  }
                                />
                                <button
                                  onClick={() =>
                                    handleRemarkSubmit(index, purchase._id)
                                  }
                                >
                                  Submit
                                </button>
                              </div>
                            ) : (
                              <div>
                                {purchase.remarks}{" "}
                                {/* Use purchase.remarks instead of purchase.remark */}
                                <button
                                  onClick={() =>
                                    setEditingRemarks((prevRemarks) => ({
                                      ...prevRemarks,
                                      [index]: purchase.remarks || "", // Use purchase.remarks instead of purchase.remark
                                    }))
                                  }
                                >
                                  Edit
                                </button>
                              </div>
                            )}
                          </td>
                          <td className="table-secondary">
                            <select
                              value={purchase.approval || "Pending"} // Use the existing approval value or "Pending" as the default
                              onChange={(e) =>
                                handleApprovalChange(
                                  index,
                                  e.target.value,
                                  purchase._id
                                )
                              } // Call a new function to handle approval change
                            >
                              <option value="Pending">Pending</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                              <option value="Hold">Hold</option>
                            </select>
                          </td>
                          <td className="table-secondary">
                            {editingBillNos[index] !== undefined ? (
                              <div>
                                <input
                                  type="text"
                                  value={editingBillNos[index] || ""}
                                  onChange={(e) =>
                                    handleBillNoChange(index, e.target.value)
                                  }
                                />
                                <button
                                  onClick={() =>
                                    handleBillNoSubmit(index, purchase._id)
                                  }
                                >
                                  Submit
                                </button>
                              </div>
                            ) : (
                              <div>
                                {purchase.BillNos}{" "}
                                {/* Use purchase.BillNos instead of purchase.BillNo */}
                                <button
                                  onClick={() =>
                                    setEditingBillNos((prevBillNos) => ({
                                      ...prevBillNos,
                                      [index]: purchase.BillNos || "", // Use purchase.remarks instead of purchase.remark
                                    }))
                                  }
                                >
                                  Edit
                                </button>
                              </div>
                            )}
                          </td>
                          <td className="table-secondary">
                            {editingTrackingNos[index] !== undefined ? (
                              <div>
                                <input
                                  type="text"
                                  value={editingTrackingNos[index] || ""}
                                  onChange={(e) =>
                                    handleTrackingNoChange(
                                      index,
                                      e.target.value
                                    )
                                  }
                                />
                                <button
                                  onClick={() =>
                                    handleTrackingNoSubmit(index, purchase._id)
                                  }
                                >
                                  Submit
                                </button>
                              </div>
                            ) : (
                              <div>
                                {purchase.TrackingNos}{" "}
                                {/* Use purchase.TrackingNos instead of purchase.TrackingNo */}
                                <button
                                  onClick={() =>
                                    setEditingTrackingNos(
                                      (prevTrackingNos) => ({
                                        ...prevTrackingNos,
                                        [index]: purchase.TrackingNos || "", // Use purchase.remarks instead of purchase.remark
                                      })
                                    )
                                  }
                                >
                                  Edit
                                </button>
                              </div>
                            )}
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
