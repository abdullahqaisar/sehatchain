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
