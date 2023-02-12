import React, { useState, useEffect } from "react";
import axios from "../util/axios";
import { Route, Routes, useNavigate } from "react-router-dom";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("prooo")
    checkLogin();
  });

  const checkLogin = async () => {
    const userToken = localStorage.getItem("token");
    if (!userToken || userToken === "undefined") {
      return navigate("/sehatchain/login");
    }
    try {
      const response = await axios.get("/auth/user/protected", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      console.log("Protected Route: ", response.data);
      if (response.data.status === "success") {
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
        {...rest}
        render={(props) =>
          isLoggedIn ? <Component {...props} /> : navigate("/sehatchain/login")
        }
      />
    </Routes>
  );
};