import React, { useEffect } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

export function RequestModal(props) {
  const { open, onClose, selectedRequest, onAccept } = props;

  const handleAcceptRequest = () => {
    onAccept();
  };

  useEffect(() => {console.log(selectedRequest)}, [selectedRequest]);

  return (
    <div>
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: 200, md: 400 },
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
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Request Details
          </Typography>
          <Typography variant="body1">
            <b>
              {selectedRequest.diseaseCategory === "0"
                ? "Heart Disease Prediction"
                : "Lung Cancer Prediction"}
            </b>
          </Typography>
          <Typography variant="body1">
            <b>To Predict: </b>
            {selectedRequest ? selectedRequest.spec : ""}
          </Typography>
          <Typography variant="body1">
            <b>Date: </b>
            {selectedRequest ? selectedRequest.formattedDate : ""}
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
