import React, { useState, useEffect } from "react";
import axios from "../util/axios";
import { Route, Routes, useNavigate } from "react-router-dom";

export const HospitalProtectedRoute = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    checkLogin();
  });

  const checkLogin = async () => {
    const token = localStorage.getItem("hospitalToken");
    if (!token || token === "undefined") {
      return navigate("/sehatchain/hospital/login");
    }
    try {
      const response = await axios.get("/auth/hospital/protected", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Protected Route: ", response.status);
      if (response.status === 200) {
        console.log("Hii ", response.data);
        setIsLoading(false);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      setIsLoggedIn(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route
        path="*"
        element={
          isLoggedIn ? (
            props.children
          ) : (
            <div>Not Logged In. Please Login to continue.</div>
          )
        }
      />
    </Routes>
  );
};
