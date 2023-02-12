import { useState, useEffect } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "../../../util/axios";

export function RequestTable() {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  const handleClick = (link) => navigate(link);

  async function fetchData() {
    const response = await axios.get("hospital/getrequests");
    setRequests(response.data.requests);
  }

  const columns = [
    { name: "Disease Name", options: { filter: false } },
    { name: "Disease Category", options: { filter: false } },
    { name: "Age Limit", options: { filter: false } },
    { name: "Patient City", options: { filter: false } },
    { name: "Price", options: { filter: false } },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <TableContainer
        onClick={() => {
          handleClick("../results");
        }}
        sx={{ mt: 3 }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell style={{ fontWeight: "bold" }}>
                  {column.name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((request) => (
              <TableRow>
                <TableCell>{request.diseaseName}</TableCell>
                <TableCell>{request.diseaseCategory}</TableCell>
                <TableCell>{request.ageLimit}</TableCell>
                <TableCell>{request.patientCity}</TableCell>
                <TableCell>{request.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
