import React, { useState, useEffect } from "react";
import axios from "../util/axios";
import { Route, Routes, useNavigate } from "react-router-dom";
import LoadingScreen from "../components/loadingScreen/LoadingScreen";

export const ProtectedRoute = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    checkLogin();
  });

  const checkLogin = async () => {
    const userToken = localStorage.getItem("token");
    console.log("User Token: ", userToken);
    if (!userToken || userToken === "undefined") {
      return navigate("/sehatchain/login");
    }
    try {
      const response = await axios.get("/auth/user/protected", {
        headers: {
          Authorization: `Bearer ${userToken}`,
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
    return <LoadingScreen />;
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
