// import react from 'react';
import { useState } from "react";
import loginInfo from "../loginInfo";
import LoginInfo from "./LoginInfo";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // If using React Router

import React from "react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  loginInfo.map((item) => (
    <LoginInfo username={item.username} password={item.password} />
  ));

  const errors = {
    uname: "invalid username",
    pass: "invalid password",
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { email, pass } = event.target.elements;

    axios
      .post("http://localhost:5000/login", {
        email: email.value,
        password: pass.value,
      })
      .then((result) => {
        console.log(email.value);
        console.log(pass.value);
        console.log(result);
        if (result.data === "success") {
          console.log("hello");
          setTimeout(() => {
            navigate("/home");
          }, 2000);
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        // Handle error scenarios
      });

    const userData = loginInfo.find((user) => user.username === email.value);

    if (userData) {
      if (userData.password !== pass.value) {
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
      }
    } else {
      setErrorMessages({ name: "email", message: errors.uname });
    }
  };

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Email </label>
          <input type="text" name="email" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">
          {isSubmitted ? <div>Log in succeseeful</div> : renderForm}
        </div>
      </div>
    </div>
  );
}
