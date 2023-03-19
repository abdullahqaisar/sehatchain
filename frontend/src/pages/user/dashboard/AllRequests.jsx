import { useState, useEffect } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "../../../util/axios";

export function AllRequests() {
  const [requests, setRequests] = useState([""]);

  async function fetchData() {
    const response = await axios({
      method: "get",
      url: "/user/requests/all",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setRequests(response.data.requests);
  }

  const columns = [
    { name: "Hospitals", options: { filter: false } },
    { name: "Label", options: { filter: false } },
    { name: "Date", options: { filter: false } },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {!requests ? (
        <h1>No Requests Found</h1>
      ) : (
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
