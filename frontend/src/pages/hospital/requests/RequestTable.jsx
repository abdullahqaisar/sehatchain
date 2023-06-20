import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import axios from "../../../util/axios";
import { RequestModal } from "./RequestDetailsModal";

export function RequestTable() {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [open, setOpen] = useState(false);
  const [trainingResult, setTrainingResult] = useState(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await axios({
        method: "get",
        url: "/hospital/getrequests",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("hospitalToken")}`,
        },
      });
      console.log(requests);
      setRequests(response.data.requests);
    }

    fetchData();
  }, []);

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

  const columns = [
    { name: "Hospitals", options: { filter: false } },
    { name: "Spec", options: { filter: false } },
    {
      name: "View",
      options: {
        filter: false,
        customBodyRenderLite: (index) => (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setSelectedRequest(requests[index])}
          >
            View
          </Button>
        ),
      },
    },
  ];

  const handleAcceptRequest = async () => {
    if (!selectedRequest) return;
    console.log("Accept Request button clicked");

    const formData = new FormData();

    formData.append("requestId", selectedRequest._id);
    formData.append("category", selectedRequest.diseaseCategory);

    const trainingResponse = await axios({
      method: "post",
      url: "/hospital/trainmodel",
      data: formData,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("hospitalToken")}`,
      },
    });

    if (trainingResponse.status === 200) {
      const updatedRequests = requests.filter(
        (request) => request._id !== selectedRequest._id
      );
      setRequests(updatedRequests);
      setSelectedRequest(null);
      setTrainingResult(trainingResponse);
      setOpen(false);
    } else {
      window.alert("An error occoured, try again");
    }
  };

  return (
    <>
      {!requests ? (
        <h4>No New Requests Found</h4>
      ) : (
        <TableContainer sx={{ mt: 3, mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.name} style={{ fontWeight: "bold" }}>
                    {column.name}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map((request, index) => (
                <TableRow key={request._id}>
                  <TableCell>
                    {request.diseaseCategory === "0"
                      ? "Heart Disease Prediction"
                      : "Lung Cancer Prediction"}
                  </TableCell>
                  <TableCell>{request.spec}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        setSelectedRequest(requests[index]);
                        setOpen(true);
                      }}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
        </TableContainer>
      )}
      {selectedRequest && (
        <RequestModal
          open={open}
          onClose={() => setOpen(false)}
          onAccept={handleAcceptRequest}
          selectedRequest={selectedRequest}
          trainingResult={trainingResult}
        />
      )}
    </>
  );
}
