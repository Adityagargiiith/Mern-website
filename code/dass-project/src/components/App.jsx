import React, { useState } from "react";
import loginInfo from "../loginInfo";
import LoginInfo from "./LoginInfo";
import SignupPage from "./Signup";

import {BrowserRouter as Router, Route, Switch, BrowserRouter, Routes} from 'react-router-dom';
import LoginPage from "./LoginPage";

function App() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
        </Routes>
        
        </BrowserRouter>
    );
}

export default App;