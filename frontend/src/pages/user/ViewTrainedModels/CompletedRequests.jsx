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
import { useNavigate } from "react-router-dom";
import axios from "../../../util/axios";

export function CompletedRequests() {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  async function fetchData() {
    const response = await axios({
      method: "get",
      url: "/user/requests/completed",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setRequests(response.data.requests);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleViewRequest = (requestId) => {
    navigate(`${requestId}`);
  };

  const columns = [
    { name: "Hospitals", options: { filter: false } },
    { name: "Label", options: { filter: false } },
    { name: "Date", options: { filter: false } },
    {
      name: "View",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleViewRequest(value)}
          >
            View
          </Button>
        ),
      },
    },
  ];

  return (
    <>
      {requests.length === 0 ? (
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
                  <TableCell>{request.hospitalNames}</TableCell>
                  <TableCell>{request.spec}</TableCell>
                  <TableCell>{request.date}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleViewRequest(request._id)}
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
    </>
  );
}
