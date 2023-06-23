import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Typography, Grid, TextField, Link } from "@mui/material";

import heroImage from "../../assets/images/hero.png";
import axios from "../../util/axios";
import CustomButton from "../../components/elements/customButton/CustomButton";

import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";

import Web3 from "web3";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [ethAccount, setEthAccount] = useState("");
  const [openSnackbar1, setOpenSnackbar1] = useState(false);
  const [openSnackbar2, setOpenSnackbar2] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const navigate = useNavigate();

  const detectCurrentProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {
      setOpenSnackbar1(true);
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
      const response = await axios.post("auth/register", {
        name: name,
        email: email,
        ethAddress: ethAccount,
      });
      if (response.status === 200) {
        setSnackbarMessage("Account created Successfully");
        setOpenSnackbar2(true);
        navigate("/sehatchain/user/dashboard", { replace: false });
      } else if (response.status === 401) {
        setSnackbarMessage(
          "You already have an account, Please proceed to Login"
        );
        setOpenSnackbar2(true);
        navigate("/sehatchain/login", { replace: false });
      } else {
        setSnackbarMessage(
          "You already have an account, Please proceed to Login"
        );
        setOpenSnackbar2(true);
      }
    } catch (err) {
      setSnackbarMessage(
        "You already have an account, Please proceed to Login"
      );
      setOpenSnackbar2(true);
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
      <Snackbar
        open={openSnackbar1}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar1(false)}
      >
        <Alert onClose={() => setOpenSnackbar1(false)} severity="error">
          Please install MetaMask wallet first
        </Alert>
      </Snackbar>
      <Snackbar
        open={openSnackbar2}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar2(false)}
      >
        <Alert onClose={() => setOpenSnackbar2(false)} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Register;
