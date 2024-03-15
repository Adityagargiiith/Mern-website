import React, { useState } from "react";
import loginInfo from "../loginInfo";
import LoginInfo from "./LoginInfo";
import SignupPage from "./Signup";
import PurchasePage from "./purchasepage";
import ViewAllPurchasePage  from "./ViewAllPurchases";
import PurchaseOptions from "./PurchaseOptions";
import Home from "./Home";
import PurchaseTracker from "./PurchaseTracker";

import {BrowserRouter as Router, Route, Switch, BrowserRouter, Routes} from 'react-router-dom';
import LoginPage from "./LoginPage";

function App() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/purchase-page" element={<PurchaseOptions />} />
            <Route path="/purchase" element={<PurchasePage />} />
            <Route path="/viewallpurchase" element={<ViewAllPurchasePage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/purchasetracker" element={<PurchaseTracker />} />
        </Routes>
        
        </BrowserRouter>
    );
}

export default App;