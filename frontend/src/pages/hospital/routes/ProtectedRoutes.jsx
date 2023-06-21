import React, { useState, useEffect } from "react";
import axios from "../util/axios";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("prooo");
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
    return (
      <Box
        style={{
          background: "#EBF5FF",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "50vh",
            color: "#001E3C",
          }}
        >
          <b>Loading...</b>
        </div>
      </Box>
    );
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
