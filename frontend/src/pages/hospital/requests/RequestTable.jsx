import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import axios from "../../../util/axios";
import { RequestModal } from "./RequestDetailsModal";

import { AllRequests } from "../dashboard/AllRequests";

export function RequestTable() {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [open, setOpen] = useState(false);
  const [trainingResult, setTrainingResult] = useState(null);

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

  const columns = [
    { name: "Hospitals", options: { filter: false } },
    { name: "Label", options: { filter: false } },
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
      window.alert("Training Successful");

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
                  <TableCell>{request.hospitals}</TableCell>
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
      <AllRequests />
    </>
  );
}
