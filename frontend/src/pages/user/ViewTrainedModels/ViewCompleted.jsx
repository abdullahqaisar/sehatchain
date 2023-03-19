import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import axios from "../../../util/axios";

const ViewCompleted = () => {
  const req = useParams();
  const [request, setRequests] = useState([]);

  async function fetchData() {
    const response = await axios({
      method: "get",
      url: "/user/requests/" + req.req_id,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(response.data);
    setRequests(response.data.request);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>Request Data</h2>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h3>Request Details</h3>

          <p>
            <b>Hospital Name:</b> {request.hospitals}
          </p>
          {/* <h3>Patient Details</h3>

          
          <p>
            <b>Patient Age:</b> {request.patientAge}
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default ViewCompleted;
