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

  useEffect(() => {
    async function fetchData() {
      console.log("Hi");
      const response = await axios({
        method: "get",
        url: "/admin/requests",
        // headers: {
        //   "Content-Type": "application/json",
        //   authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        // },
      });
      console.log(response.data.requests);
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

    let formData = new FormData();
    formData.append("id", selectedRequest._id);
    console.log(formData);

    // send an axios request to the backend to approve the request
    const response = await axios({
      method: "post",
      url: "/admin/approve",
      data: formData,
      headers: {
        "Content-Type": "application/json",
        // authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    });
    console.log(response);

    if (response.status === 200) {
      window.alert("Request Approved successfully")

      const updatedRequests = requests.filter(
        (request) => request._id !== selectedRequest._id
      );
      setRequests(updatedRequests);
      setSelectedRequest(null);
      setOpen(false);
    }
  };

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
      {selectedRequest && (
        <RequestModal
          open={open}
          onClose={() => setOpen(false)}
          onAccept={handleAcceptRequest}
          selectedRequest={selectedRequest}
        />
      )}
    </>
  );
}
