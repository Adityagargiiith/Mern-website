import React, { useState } from "react";
import loginInfo from "../loginInfo";
import LoginInfo from "./LoginInfo";
import SignupPage from "./Signup";
import PurchasePage from "./purchasepage";

import {BrowserRouter as Router, Route, Switch, BrowserRouter, Routes} from 'react-router-dom';
import LoginPage from "./LoginPage";

function App() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/purchase" element={<PurchasePage />} />
        </Routes>
        
        </BrowserRouter>
    );
}

export default App;