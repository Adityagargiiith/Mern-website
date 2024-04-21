import React, { useState, useEffect } from "react";
import axios from "axios";
import { getUser } from "./LoginPage";
import { useNavigate } from "react-router";
import img1 from "./CSS/arka_logo.png";
import "./CSS/viewleave.css";
const Viewallleaves = () => {
  const navigate = useNavigate();
  const [USER, setUSER] = useState(getUser());
  const [leaveApplications, setLeaveApplications] = useState([]);

  useEffect(() => {
    const fetchLeaveApplications = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/leave-applications"
        );
        setLeaveApplications(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLeaveApplications();
  }, []);
  useEffect(() => {
    const handleStorageChange = () => {
      setUSER(getUser());
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  const handleLogout = () => {
    // setUSER(""); // Update the state to an empty string
    // setROLE("");
    // Remove USER from localStorage

    localStorage.removeItem("USER");
    localStorage.removeItem("ROLE");

    // Redirect to login page
    setTimeout(() => {
      navigate("/");
    }, 100);
  };
  const handlehomeredirect = () => {
    setTimeout(() => {
      navigate("/home");
    }, 100);
  };
  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/leave-applications/${id}`, {
        status,
      });
      // Fetch the updated leave applications
      const response = await axios.get(
        "http://localhost:5000/leave-applications"
      );
      setLeaveApplications(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const sendMail = async (user) => {
    try {
      console.log(user)
      await axios.post("http://localhost:5000/leave-mail", {
        user,
      });
    } catch (error) {
      console.error("Error sending mail:", error);
    }
  }

  return (
    <div className="App">
      <header className="header mb-3">
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
      <h1 className="heading mb-5" style={{ color: "#fff" }}>
        Leave Applications
      </h1>
      <table className="tableT">
        <thead>
          <tr>
            <th className="rowT Thead">User Name</th>
            <th className="rowT Thead">Start Date</th>
            <th className="rowT Thead">End Date</th>
            <th className="rowT Thead">Leave Type</th>
            <th className="rowT Thead">Reason</th>
            <th className="rowT Thead">Status</th>
            <th className="rowT Thead">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaveApplications.map((application, index) => (
            <tr key={index}>
              <td className="rowT Tsimp">{application.userName}</td>
              <td className="rowT Tsimp">{application.startDate}</td>
              <td className="rowT Tsimp">{application.endDate}</td>
              <td className="rowT Tsimp">{application.leaveType}</td>
              <td className="rowT Tsimp">{application.reason}</td>
              <td className="rowT Tsimp">{application.status}</td>
              <td className="rowT Tsimp">
                {application.status === "Pending" && (
                  <>
                    <button
                      className="btn btn-primary btn-color"
                      onClick={() => {
                        handleStatusChange(application._id, "Approved");
                        sendMail(application.userName);
                      }}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-primary btn-color"
                      style={{ marginLeft: "10px" }}
                      onClick={() =>
                        handleStatusChange(application._id, "Rejected")
                      }
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <main className="main-content">
        <br />
        <footer className="about">
          Copyright © 2024 Arka Aerospace - All Rights Reserved.
        </footer>
      </main>
    </div>
  );
};

export default Viewallleaves;
