import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Typography, Grid, TextField, Link } from "@mui/material";

import heroImage from "../../../assets/images/hero.png";

import CustomButton from "../../../components/elements/customButton/CustomButton";
import axios from "../../../util/axios";

import Web3 from "web3";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [ethAccount, setEthAccount] = useState("");

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
        const account = userAccount[0];
        setEthAccount(account);
        register();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const register = async () => {
    try {
      const response = await axios.post("/admin/register", {
        adminName: name,
          adminEmail: email,
          adminEthAddress: ethAccount,
      });
      if (response.status === 200) {
        window.alert("Account created Successfully");
        navigate("/sehatchain/admin/login", { replace: false });
      } else if (response.status === 401) {
        window.alert("You already have an account, Please proceed to Login ");
        navigate("/sehatchain/admin/login", { replace: false });
      } else {
        window.alert("There was an error, please try again");
      }
    } catch (err) {
      console.log(err);
    }
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
            Register
          </Typography>

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
                label="Name"
                defaultValue=""
                sx={{
                  width: "100%",
                  mb: 2,
                }}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                label="Email"
                email
                defaultValue=""
                sx={{
                  width: "100%",
                  mb: 2,
                }}
                onChange={(e) => {
                  console.log("hi");
                  setEmail(e.target.value);
                }}
              />

              <CustomButton
                backgroundColor="#217BF4"
                color="#fff"
                buttonText="Authenticate with MetaMask"
                onClick={onConnect}
              />
              <Typography
                component="p"
                sx={{
                  mt: 1,
                  fontSize: 16,
                  lineHeight: 2,
                  color: "#001E3C",
                }}
              >
                Already have an account?{" "}
                <Link
                  style={{
                    cursor: "pointer",
                    textTransform: "none",
                    border: 0,
                    textDecoration: "none",
                  }}
                  href="/sehatchain/login"
                >
                  Login instead
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Register;
