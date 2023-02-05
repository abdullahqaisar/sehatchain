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

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      const response = await axios.post("auth/hospital/login", {
        hospitalEthAddress: account,
        hospitalEmail: email,
      });
      const responseData = await response.data;
      console.log(responseData);
      if (response.status === 200) {
        localStorage.setItem("hospitalToken", responseData.token);
        console.log(localStorage.getItem("hospitalToken"));
        navigate("/sehatchain/hospital/dashboard", { replace: false });
      } else {
        window.alert("You don't have an account, please register first");
        navigate("/sehatchain/hospital/register", { replace: false });
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
      }}
    >
      <Card
        sx={{
          py: 2,
          px: 4,
          width: { xs: "70%", md: "30%" },
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
          <Submit>
            <CustomButton
              backgroundColor="#217BF4"
              sx={{ mt: 2 }}
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
            href="/sehatchain/hospital/register"
          >
            Register Here!
          </Link>
        </Typography>
      </Card>
    </Box>
  );
}

export default Login;
