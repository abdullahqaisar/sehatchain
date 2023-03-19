import React, { useEffect } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

export function RequestModal(props) {
  const { open, onClose, selectedRequest, onAccept, trainingResult } = props;

  const handleAcceptRequest = () => {
    console.log(selectedRequest);
    onAccept(selectedRequest);
  };
  useEffect(() => {
    console.log(selectedRequest);
  }, [selectedRequest]);

  return (
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
        {trainingResult.status === 200 ? (
          <>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", mb: 2, color: "green" }}
            >
              Request successful
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={onClose}
            >
              Okay
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Request Details
            </Typography>
            <Typography variant="body1">
              <b>Hospitals: </b>
              {selectedRequest ? selectedRequest.hospitals : ""}
            </Typography>
            <Typography variant="body1">
              <b>Spec: </b>
              {selectedRequest ? selectedRequest.spec : ""}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={handleAcceptRequest}
            >
              Accept Request
            </Button>
          </>
        )}
      </Box>
    </Modal>
  );
}
