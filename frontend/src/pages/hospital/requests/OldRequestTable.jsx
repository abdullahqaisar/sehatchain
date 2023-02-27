import { useState, useEffect } from "react";

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

export function RequestTable() {
  const [requests, setRequests] = useState([]);
  const [approveRequestId, setApproveRequestId] = useState("");

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
      name: "Approve",
      options: {
        filter: false,
        customBodyRenderLite: (index) => (
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleApprove(index)}
          >
            Approve
          </Button>
        ),
      },
    },
    {
      name: "Reject",
      options: {
        filter: false,
        customBodyRenderLite: (index) => (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleReject(index)}
          >
            Reject
          </Button>
        ),
      },
    },
  ];

  const handleApprove = async (index) => {
    const requestId = requests[index]._id;
    console.log(requestId);
    setApproveRequestId(requestId);
    const formData = new FormData();
    formData.append("requestId", requestId);
    const response = await axios({
      method: "post",
      url: "/hospital/approverequest",
      data: formData,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("hospitalToken")}`,
      },
    });
    if (response.status === 200) {
      console.log("Hii ", response.data);
      // start model training
      const formData = new FormData();
      formData.append("requestId", approveRequestId);
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
    }
  };

  const handleReject = (index) => {
    const requestId = requests[index].id;
  };

  useEffect(() => {
    console.log("Hii");
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
                    onClick={() => handleApprove(index)}
                  >
                    Approve
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleReject(index)}
                  >
                    Reject
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
