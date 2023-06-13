import * as React from "react";

import InputBase from "@mui/material/InputBase";

import { Box, Grid, Typography, TextField } from "@mui/material";
import { Container } from "@mui/system";

import { CustomButton } from "../../../components/elements/customButton";
import CustomTextField from "../components/customTextField/CustomTextField";

const AboutUs = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");

  const sendEmail = async () => {
    try {
      console.log("Name: ", name);
      console.log("Question: ", message);
      const response = await fetch("http://localhost:5000/api/user/contactus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });
      const responseData = await response.json();
      console.log(responseData);
      if (response.status === 200) {
        window.alert("Message sent, we will reply in 24 hrs");
      } else {
        window.alert("Error sending mail, please try again");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Grid
        container
        item
        md={12}
        sx={{ alignItems: "center", justifyContent: "center" }}
      >
        <Grid md={12}>
          <CustomTextField
            key="Name"
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <CustomTextField
            key="Email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor={`Feedback`}>
            <Typography
              sx={{ fontSize: 15, textAlign: "left", my: 2 }}
              color="#071B2F"
            >
              Feedback
            </Typography>
          </label>
          <TextField
            multiline
            rows={4}
            defaultValue=""
            sx={{
              width: "100%",
              mr: { xs: 0, md: 3 },
              mb: { xs: 2, md: 2 },
              background: "#F5FAFF",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#98CDFF",
              },
            }}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            <CustomButton
              backgroundColor="#217BF4"
              color="#fff"
              buttonText="Submit"
              onClick={sendEmail}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AboutUs;
