import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import icon from "../../assets/images/logos/icon.png";
import CustomButton from "../../components/elements/customButton/CustomButton";
import { Box, Typography, TextField, Card, Link } from "@mui/material";
import styled from "@emotion/styled";
import Web3 from "web3";
import axios from "../../util/axios";

import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";

const Logo = styled("img")`
  width: 4rem;
  height: 4rem;
  padding: 1rem;
`;

const Form = styled("form")``;

const Submit = styled("div")`
  margin: 1rem 0 2rem;
`;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [account, setAccount] = useState("");
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
        await setAccount(userAccount[0]);

        checkAccount();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const checkAccount = async () => {
    try {
      const response = await axios.post("auth/login", {
        ethAddress: account,
      });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        navigate("/sehatchain/user/dashboard", { replace: false });
      } else {
        setSnackbarMessage("You don't have an account, please register first");
        setOpenSnackbar2(true);
        navigate("/sehatchain/register", { replace: false });
      }
    } catch (err) {
      setSnackbarMessage("You don't have an account, please register first");
      setOpenSnackbar2(true);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{
        backgroundColor: "#F1F6FD",
        p: 0.5,
      }}
    >
      <Card
        sx={{
          py: 4,
          px: 10,
        }}
      >
        <Logo src={icon} alt="icon" />
        <Typography
          component="h4"
          variant="h4"
          sx={{
            textAlign: "center",
            fontSize: { xs: 20, md: 30 },
            fontWeight: "700",
            color: "#001E3C",
          }}
        >
          Sign In
        </Typography>
        <Form>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{ mt: 2 }}
          />
          {/* <TextField
            label="Password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            sx={{ mt: 2 }}
          /> */}
          <Submit>
            {/* <CustomButton
              backgroundColor="#217BF4"
              color="#fff"
              sx={{ m: 2 }}
              buttonText="Sign in"
              type="submit"
              onClick={() => console.log("Sign in button clicked")}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                my: 2,
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: 1.5,
                  backgroundColor: "#D9D9D9",
                  color: "#adadad",
                }}
              ></Box>
              <Box
                sx={{
                  width: "auto",
                  height: "auto",
                  backgroundColor: "#fff",
                  px: 2,
                  color: "#adadad",
                }}
              >
                OR
              </Box>
              <Box
                sx={{
                  width: "100%",
                  height: 1.5,
                  backgroundColor: "#D9D9D9",
                }}
              ></Box>
            </Box> */}

            <CustomButton
              backgroundColor="#217BF4"
              sx={{ mt: 2, }}
              color="#fff"
              buttonText="Sign in with Metamask"
              type="submit"
              onClick={onConnect}
            />
          </Submit>
        </Form>
        <Typography component="p">
          Want to register?{" "}
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
      </Card>
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

export default Login;
