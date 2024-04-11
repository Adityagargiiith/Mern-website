import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import SignupPage from "./Signup";
import PurchasePage from "./purchasepage";
import ViewAllPurchasePage from "./ViewAllPurchases";
import PurchaseOptions from "./PurchaseOptions";
import Home from "./Home";
import PurchaseTracker from "./PurchaseTracker";
import LoginPage from "./LoginPage";
// import { USER, ROLE } from "./LoginPage";
import { getUser, getRole } from "./LoginPage";
// const USER = localStorage.getItem("USER") || "";
// const ROLE = localStorage.getItem("ROLE") || "";
// console.log(USER);
const USER = getUser();
const ROLE = getRole();
console.log(USER, ROLE);
const isAuthenticated = () => {
  return USER !== "";
};
const PrivateRoute = ({ children }) => {
  const location = useLocation();

  return isAuthenticated() ? (
    children
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
};

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        path="/purchase-page"
        element={
          <PrivateRoute>
            <PurchaseOptions />
          </PrivateRoute>
        }
      />
      <Route
        path="/purchase"
        element={
          <PrivateRoute>
            <PurchasePage />{" "}
          </PrivateRoute>
        }
      />
      <Route
        path="/viewallpurchase"
        element={
          <PrivateRoute>
            <ViewAllPurchasePage />{" "}
          </PrivateRoute>
        }
      />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />{" "}
          </PrivateRoute>
        }
      />
      <Route
        path="/purchasetracker"
        element={
          <PrivateRoute>
            <PurchaseTracker />{" "}
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default AnimatedRoutes;
