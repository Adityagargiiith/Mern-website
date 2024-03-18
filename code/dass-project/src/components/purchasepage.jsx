import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CSS/purchasepage.css";
import img1 from "./CSS/arka_logo.png";
import { motion } from "framer-motion";
import { USER } from "./LoginPage";
import e from "cors";

const getCurrDate = () => {
  let currDate = new Date();
  const year = currDate.getFullYear();
  const month = String(currDate.getMonth() + 1).padStart(2, "0");
  const day = String(currDate.getDate()).padStart(2, "0");

  currDate = `${day}-${month}-${year}`;
  return currDate;
};

export default function PurchasePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user: USER,
    date: getCurrDate(),
    linkToPurchase: "",
    componentName: "",
    quantity: 1,
    team: "",
    chimsFile: "",
    quoteFile: "",
    project: "",
    chimsFiledata: "",
    quoteFiledata: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    // Check if the input is a radio button
    const radioValue = checked ? value : "";

    // Update the form data based on the input type
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "radio" ? radioValue : value, // Use radioValue for radio inputs, value for others
    }));

    // Ensure quantity is at least 1
    if (name === "quantity" && value < 1) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: 1,
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const name = e.target.id;
    const filename = file ? file.name : "";
    console.log("File:", filename);

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: file.name,
      [`${name}data`]: file,
    }));
  };
  const projects = [
    "Charmender",
    "Pikachu",
    "Starling",
    "DTRS",
    "Generic",
    "MFG",
  ];

  const teams = [
    "Embedded",
    "Mechanical",
    "Firmware",
    "Robotics",
    "AI",
    "Management",
    "Founder's Office",
  ];

  const [chimsFile2, setChimsFile] = useState("");
  const [chimsFile2title, setChimsFileTitle] = useState("");
  const [quoteFile, setQuoteFile] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    // // Append non-file data
    // formDataToSend.append("linkToPurchase", formData.linkToPurchase);
    // formDataToSend.append("componentName", formData.componentName);
    // formDataToSend.append("quantity", formData.quantity);
    // formDataToSend.append("team", formData.team);
    // formDataToSend.append("project", formData.project);

    // // Append file data
    formDataToSend.append("chimsFile2", chimsFile2);
    formDataToSend.append("chimsFile2title", chimsFile2title);
    console.log(chimsFile2);
    console.log(chimsFile2title);
    // formDataToSend.append("quoteFile", formData.quoteFiledata);
    // console.log// Log the form data
    try {
      await axios.post("http://localhost:5000/purchase", formData);
      await axios.post("http://localhost:5000/upload-files", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Assuming successful submission, redirect or show a success message
      navigate("/home"); // Redirect to a success page
      alert("Form submitted successfully");
    } catch (error) {
      // Handle error
      console.error("Error:", error);
    }
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
          className="container py-5 h-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="align-center-dif">
            <div className="col-12 col-lg-9 col-xl-7">
              <div className="card card-old" style={{ borderRadius: 30 }}>
                <div className="purchase-form p-md-5">
                  <h1 className="mb-md-5 heading">PURCHASE REQUISITION FORM</h1>
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="firstName">
                            Link to purchase{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="url"
                            id="linkToPurchase"
                            name="linkToPurchase"
                            className="form-control form-control-lg-lg"
                            style={{ width: "600px", height: "30px" }}
                            value={formData.linkToPurchase}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="componentName">
                            Component Name{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            id="componentName"
                            name="componentName"
                            className="form-control form-control-lg-lg"
                            style={{ width: "600px", height: "30px" }}
                            value={formData.componentName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="quantity">
                            Quantity
                          </label>
                          <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            className="form-control form-control-lg-lg"
                            style={{ width: "600px", height: "30px" }}
                            value={formData.quantity}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="team">
                            Team <span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            id="team"
                            name="team"
                            className="form-control form-control-lg-lg"
                            style={{ width: "600px", height: "30px" }}
                            value={formData.team}
                            onChange={handleChange}
                            required
                          >
                            <option value="" className="dropdown-option">
                              Select team
                            </option>
                            {teams.map((team, index) => (
                              <option
                                key={index}
                                value={team}
                                className="dropdown-option"
                              >
                                {team}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="mb-4">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="chimsFile">
                            CHIMS: Does the purchase involve IC or semiconductor
                            items?
                          </label>
                          <input
                            type="file"
                            id="chimsFile"
                            className="form-control form-control-lg-lg"
                            style={{ width: "600px" }}
                            onChange={(e) => {
                              handleFileChange(e);
                              setChimsFile(e.target.files[0]);
                              setChimsFileTitle(e.target.files[0].name);
                            }}
                          />
                          {formData.chimsFile}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="quoteFile">
                            PO/BOM/Quote Upload
                          </label>
                          <input
                            type="file"
                            id="quoteFile"
                            className="form-control form-control-lg-lg fileee"
                            style={{ width: "600px" }}
                            onChange={handleFileChange}
                          />
                          {formData.quoteFile}
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="project">
                            Project <span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            id="project"
                            name="project"
                            className="form-control form-control-lg-lg"
                            style={{ width: "600px", height: "30px" }}
                            value={formData.project}
                            onChange={handleChange}
                            required
                          >
                            <option value="" className="dropdown-option">
                              Select Project
                            </option>
                            {projects.map((project, index) => (
                              <option
                                key={index}
                                value={project}
                                className="dropdown-option"
                              >
                                {project}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <button type="submit" className="btn btn-primary btn-color">
                      Submit
                    </button>
                  </form>
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
