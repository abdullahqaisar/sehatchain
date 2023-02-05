import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import icon from "../../assets/images/logos/icon.png";
import CustomButton from "../../components/elements/customButton/CustomButton";
import { Box, Typography, TextField, Card, Link } from "@mui/material";
import styled from "@emotion/styled";
import Web3 from "web3";
import axios from "../../util/axios";

const Logo = styled("img")`
  width: 4rem;
  height: 4rem;
  padding: 1rem;
`;

const Form = styled("form")``;

const Submit = styled("div")`
  margin: 1rem 0 2rem;
`;

function Register() {
  const [hospitalName, setHospitalName] = useState("");
  const [hospitalAddress, setHospitalAddress] = useState("");
  const [hospitalEmail, setHospitalEmail] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [ethAccount, setEthAccount] = useState("");
  const [ethBalance, setEthBalance] = useState("");
  const [registered, setRegistered] = useState(false);

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
        let ethBalance = await web3.eth.getBalance(account);
        setEthBalance(ethBalance);
        console.log("ethBalance", ethBalance);
        console.log("account", account);
        setIsConnected(true);
        register();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const register = async () => {
    try {
      const response = await axios.post("/auth/hospital/register", {
        hospitalName,
        hospitalAddress,
        hospitalEmail,
        hospitalEthAddress: ethAccount,
      });

      const responseData = response.data;
      console.log(responseData);
      if (response.status === 200) {
        setRegistered(true);
      } else if (response.status === 401) {
        window.alert("You already have an account, Please proceed to Login ");
        navigate("/sehatchain/hospital/login", { replace: false });
      } else {
        window.alert("There was an error, please try again");
      }
    } catch (err) {
      console.log(err);
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
        py: 0.5,
        px: { lg: 50, md: 25, xs: 2 },
      }}
    >
      <Card
        sx={{
          py: 2,
          px: 4,
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
          Register
        </Typography>

        {registered ? (
          <Box>
            <Typography
              component="p"
              sx={{
                textAlign: "center",
                fontSize: { xs: 14, md: 16 },
                fontWeight: "400",
                color: "#001E3C",
                m: 2,
              }}
            >
              Your account has been registered, please wait 24 hours for your
              account to be verified!
            </Typography>
            <CustomButton
              backgroundColor="#217BF4"
              color="#fff"
              sx={{ m: 2 }}
              buttonText="Home"
              href="/sehatchain"
            />
          </Box>
        ) : (
          <Box>
            <Form>
              <TextField
                label="Hospital Name"
                variant="outlined"
                fullWidth
                value={hospitalName}
                onChange={(e) => setHospitalName(e.target.value)}
                type="password"
                required
                sx={{ mt: 2 }}
              />
              <TextField
                id="filled-basic"
                label="Email"
                variant="outlined"
                fullWidth
                value={hospitalEmail}
                onChange={(e) => setHospitalEmail(e.target.value)}
                required
                sx={{ mt: 2 }}
              />
              <TextField
                label="Hospital Address"
                variant="outlined"
                fullWidth
                value={hospitalAddress}
                onChange={(e) => setHospitalAddress(e.target.value)}
                required
                sx={{ mt: 2 }}
              />
              <Submit>
                <CustomButton
                  backgroundColor="#217BF4"
                  color="#fff"
                  sx={{ my: 2 }}
                  buttonText="Authenticate with MetaMask"
                  type="submit"
                  onClick={onConnect}
                />
              </Submit>
            </Form>
            <Typography component="p">
              Already have an account?{" "}
              <Link
                style={{
                  cursor: "pointer",
                  textTransform: "none",
                  textDecoration: "none",
                }}
                href="/sehatchain/hospital/login"
              >
                Login Here!
              </Link>
            </Typography>
          </Box>
        )}
      </Card>
    </Box>
  );
}

export default Register;
