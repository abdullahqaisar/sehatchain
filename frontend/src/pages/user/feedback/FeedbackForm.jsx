import * as React from "react";

import { Box, Grid, Typography, TextField } from "@mui/material";
import axios from "../../../util/axios";
import { CustomButton } from "../../../components/elements/customButton";
import CustomTextField from "../components/customTextField/CustomTextField";

import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const FeedbackForm = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = React.useState("success");
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const sendEmail = async () => {
    try {
      console.log("Name: ", name);
      console.log("Question: ", message);

      const response = await axios({
        method: "post",
        url: "/user/contactus",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          name,
          email,
          message,
        },
      });

      if (response.status === 200) {
        setSnackbarSeverity("success");
        setSnackbarMessage("Message sent, we will reply in 24 hrs");
        setSnackbarOpen(true);
      } else {
        setSnackbarSeverity("error");
        setSnackbarMessage("Error sending mail, please try again");
        setSnackbarOpen(true);
      }
    } catch (err) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Error sending mail, please try again");
      setSnackbarOpen(true);
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
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={6000}
              onClose={handleCloseSnackbar}
            >
              <MuiAlert
                onClose={handleCloseSnackbar}
                severity={snackbarSeverity}
                sx={{ width: "100%" }}
              >
                {snackbarMessage}
              </MuiAlert>
            </Snackbar>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FeedbackForm;
