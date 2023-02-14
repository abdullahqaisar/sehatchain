import React from "react";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";

const ManageRequest = () => {
  const request = useParams();
  const columns = [
    { name: "Disease Name", options: { filter: false } },
    { name: "Disease Category", options: { filter: false } },
    { name: "Age Limit", options: { filter: false } },
    { name: "Patient City", options: { filter: false } },
    { name: "Price", options: { filter: false } },
  ];

  return (
    <div>
      <h2>Request Data</h2>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ width: "50%" }}>
          <h3>Patient Details</h3>

          <p>
            <b>Patient Name:</b> {request.patientName}
          </p>
          <p>
            <b>Patient Age:</b> {request.patientAge}
          </p>
        </div>
        <div style={{ width: "50%" }}>
          <h3>Request Details</h3>
          <p>
            <b>Request ID:</b> {request.id}
          </p>
          <p>
            <b>Request Date:</b> {request.date}
          </p>
          <p>
            <b>Request Status:</b> {request.status}
          </p>
        </div>
      </div>

      <div style={{ textAlign: "right" }}>
        <Button variant="contained" color="primary">
          Approve Request
        </Button>
        &nbsp;&nbsp;
        <Button variant="contained" color="secondary">
          Reject Request
        </Button>
      </div>
    </div>
  );
};

export default ManageRequest;
