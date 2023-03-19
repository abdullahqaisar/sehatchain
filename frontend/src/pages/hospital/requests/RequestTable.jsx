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

export function RequestTable() {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [open, setOpen] = useState(false);

  async function fetchData() {
    const response = await axios({
      method: "get",
      url: "/hospital/getrequests",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("hospitalToken")}`,
      },
    });
    setRequests(response.data.requests);
  }

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

    const formData = new FormData();
    formData.append("requestId", selectedRequest._id);
    const trainingResponse = await axios({
      method: "post",
      url: "/hospital/trainmodel",
      data: formData,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("hospitalToken")}`,
      },
    });
    console.log(trainingResponse);
    if (trainingResponse.status === 200) {
      console.log(trainingResponse.status);
      setOpen(false); // Close the modal here
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <TableContainer sx={{ mt: 3 }}>
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
                    onClick={() => setSelectedRequest(requests[index])}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedRequest && (
        <RequestModal
          open={!!selectedRequest}
          onClose={() => setOpen(false)}
          onAccept={handleAcceptRequest}
          selectedRequest={selectedRequest}
        />
      )}
    </>
  );
}
