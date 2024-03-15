// import react from 'react';
import { useState } from "react";
import loginInfo from "../loginInfo";
import LoginInfo from "./LoginInfo";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import image from "./CSS/arka_logo.png";
import "./CSS/login.css";
import img1 from "./CSS/arka_logo.png";
import lkimg from "./CSS/lock.png";
import usimg from "./CSS/user.png";

import React from "react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  loginInfo.map((item) => (
    <LoginInfo username={item.username} password={item.password} />
  ));

  const errors = {
    uname: "invalid username/email",
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

    const userData = loginInfo.find((user) => user.username === email.value || user.email === email.value);

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
    <>
    <div className="App">
      <img src={img1} alt="Arka Logo" className="image"/>

      <div className="grid">
      <form onSubmit={handleSubmit} className="form login">
        <div className="form__field">
        <label for="login__username"><img src={usimg} class="icon"/><span class="hidden">Username / E-mail</span></label>
          <input type="text" className="form__input" placeholder="Username / E-mail" name="email" style={{ height: '60px' }}  required />
          {renderErrorMessage("uname")}
        </div>
        
        <div className="form__field">
        <label for="login__password"><img src={lkimg} className="icon"/><span class="hidden">Password</span></label>
          <input type="password" className="form__input" placeholder="Password" name="pass" style={{ height: '60px' }} required />
          {renderErrorMessage("pass")}
        </div>
        <div className="form__field">
          <input type="submit" />
        </div>
      </form>
      </div>
    </div>
    </>
  );

  const logoinsert = (
    <img src={image} alt="Arka Logo" className="image"/>
  );

  return (
      <>
          {isSubmitted ? <div>Log in succeseeful</div> : renderForm}
    </>
  );
}
