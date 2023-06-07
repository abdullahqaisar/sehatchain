import React, { useEffect } from "react";
import { Modal, Box, Typography, Button, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

export function RequestModal(props) {
  const { open, onClose, selectedRequest, onAccept, trainingResult } = props;

  const handleAcceptRequest = () => {
    console.log("Selected: ",selectedRequest);
    onAccept();
  };

  useEffect(() => {
  }, [selectedRequest]);

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = React.useState("success");
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  useEffect(() => {
    if (trainingResult) {
      if (trainingResult.status === 200) {
        setSnackbarSeverity("success");
        setSnackbarMessage("Request approved successfully.");
        setSnackbarOpen(true);
      } else {
        setSnackbarSeverity("error");
        setSnackbarMessage(
          `There was an error while approving the request. Error status code: ${trainingResult.status}.`
        );
        setSnackbarOpen(true);
      }
    }
  }, [trainingResult]);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Button
            onClick={onClose}
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px",
            }}
          >
            X
          </Button>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={5000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <MuiAlert
              onClose={handleCloseSnackbar}
              severity={snackbarSeverity}
              sx={{ width: "100%" }}
            >
              {snackbarMessage}
            </MuiAlert>
          </Snackbar>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Request Details
          </Typography>
          <Typography variant="body1">
            <b>Hospitals: </b>
            {selectedRequest ? selectedRequest.hospitals : ""}
          </Typography>
          <Typography variant="body1">
            <b>Specialization: </b>
            {selectedRequest ? selectedRequest.spec : ""}
          </Typography>
          <Typography variant="body1">
            <b>Description: </b>
            {selectedRequest ? selectedRequest.description : ""}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleAcceptRequest}
          >
            Accept Request
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
