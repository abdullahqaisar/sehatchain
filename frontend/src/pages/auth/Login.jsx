import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Typography, Grid, TextField, Link } from "@mui/material";

import heroImage from "../../assets/images/hero.png";

import CustomButton from "../../components/elements/customButton/CustomButton";

import Web3 from "web3";

function Login() {
  const [isConnected, setIsConnected] = useState(false);
  const [ethAddress, setEthAddress] = useState("");
  const [account, setAccount] = useState("");
  const [ethBalance, setEthBalance] = useState("");

  const navigate = useNavigate();

  const detectCurrentProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {
      window.alert("Please install MetaMask wallet first");
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
        await setAccount(userAccount[0]);
        console.log("account", account);
        let ethBalance = await web3.eth.getBalance(account);
        setEthBalance(ethBalance);
        setIsConnected(true);
        checkAccount();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const checkAccount = async () => {
    try {
      console.log("My account is", account);
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          ethAddress: account,
        }),
      });
      const responseData = await response.json();
      console.log(responseData);
      if (response.status === 200) {
        localStorage.setItem("token", responseData.token);
        console.log(localStorage.getItem("token"));
        navigate("/sehatchain/user/dashboard", { replace: false });
      } else {
        window.alert("You don't have an account, please register first");
        navigate("/sehatchain/register", { replace: false });
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
          {/* <Typography
            component="p"
            sx={{
              letterSpacing: 0,
              lineHeight: 2,
              color: "#001E3C",
            }}
          >
            Connect your MetaMask wallet to continue, you will require a MetaMask wallet to Sign In
          </Typography> */}

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
                mb: 2,
              }}
            >
              <CustomButton
                backgroundColor="#217BF4"
                color="#fff"
                buttonText="Sign in With Metamask"
                onClick={onConnect}
              />
            </Grid>
          </Grid>

          <Typography
            component="p"
            sx={{
              fontSize: 16,
              color: "#001E3C",
            }}
          >
            Don't have an account?{" "}
            <Link
              style={{
                cursor: "pointer",
                textTransform: "none",
                border: 0,
                textDecoration: "none",
              }}
              href="/sehatchain/register"
            >
              Register Here!
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Login;
