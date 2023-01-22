import React, { useState } from "react";

import { Box, Typography, Grid, TextField, Link } from "@mui/material";

import heroImage from "../../assets/images/hero.png";

import CustomButton from "../../components/elements/customButton/CustomButton";

import Web3 from "web3";

function Login() {
  const [isConnected, setIsConnected] = useState(false);
  const [ethBalance, setEthBalance] = useState("");

  const detectCurrentProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {
      console.log("Non-ethereum browser detected. You should install Metamask");
    }
    return provider;
  };

  const onConnect = async () => {
    try {
      const currentProvider = detectCurrentProvider();
      if (currentProvider) {
        await currentProvider.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(currentProvider);
        const userAccount = await web3.eth.getAccounts();
        const account = userAccount[0];
        let ethBalance = await web3.eth.getBalance(account);
        setEthBalance(ethBalance);
        console.log("ethBalance", ethBalance);
        setIsConnected(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onDisconnect = () => {
    setIsConnected(false);
  };

  return (
    <Box>
      <Grid
        container
        sx={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid
          item
          container
          md={6}
          sx={{
            backgroundColor: "#001E3C",
            minHeight: { xs: "50vh", md: "100vh" },
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid
            item
            sx={{
              mb: 4,
            }}
          >
            <Box>
              <img
                src={heroImage}
                alt="main"
                style={{
                  maxWidth: "80%",
                }}
              />
            </Box>
          </Grid>
        </Grid>
        <Grid md={6} item>
          <Typography
            component="h3"
            sx={{
              fontSize: { xs: 30, md: 55 },
              letterSpacing: 0,
              fontWeight: "bold",
              lineHeight: 2,
              color: "#001E3C",
            }}
          >
            Sign in
          </Typography>
          {!isConnected && (
            <Grid
              container
              md={12}
              sx={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Grid
                md={6}
                item
                sx={{
                  mx: { xs: 4, md: 0 },
                  mb: 4,
                }}
              >
                <TextField
                  label="Email"
                  email
                  defaultValue=""
                  sx={{
                    width: "100%",
                    mb: 2,
                  }}
                />
                <TextField
                  label="Password"
                  password
                  defaultValue=""
                  sx={{
                    width: "100%",
                    mb: 2,
                  }}
                />
                <CustomButton
                  backgroundColor="#217BF4"
                  color="#fff"
                  buttonText="Sign In"
                  // href="/sehatchain/user/dashboard"
                  onClick={onConnect}
                />
              </Grid>
            </Grid>
          )}
          {isConnected && <div> Dashboard Components </div>}
        </Grid>
      </Grid>
    </Box>
  );
}

export default Login;
