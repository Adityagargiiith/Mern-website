import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getUser } from "./LoginPage";
import { useNavigate } from "react-router";
import img1 from "./CSS/arka_logo.png";
import "./CSS/viewleave.css"
const Viewallleaves = () => {
  const navigate = useNavigate();
  const [USER, setUSER] = useState(getUser());
  const [leaveApplications, setLeaveApplications] = useState([]);

  useEffect(() => {
    const fetchLeaveApplications = async () => {
      try {
        const response = await axios.get('http://localhost:5000/leave-applications');
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
      await axios.put(`http://localhost:5000/leave-applications/${id}`, { status });
      // Fetch the updated leave applications
      const response = await axios.get('http://localhost:5000/leave-applications');
      setLeaveApplications(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
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
      <table>
        <thead>
          <tr>
            <th>User Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Leave Type</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaveApplications.map((application, index) => (
            <tr key={index}>
              <td>{application.userName}</td>
              <td>{application.startDate}</td>
              <td>{application.endDate}</td>
              <td>{application.leaveType}</td>
              <td>{application.reason}</td>
              <td>{application.status}</td>
              <td>
                {application.status === 'Pending' && (
                  <>
                    <button onClick={() => handleStatusChange(application._id, 'Approved')}>
                      Accept
                    </button>
                    <button onClick={() => handleStatusChange(application._id, 'Rejected')}>
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