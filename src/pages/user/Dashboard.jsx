import * as React from "react";

import { Box, Typography, Grid } from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import { Container } from "@mui/system";

import { requests } from "./requests.data";

const ResearcherDashboard = () => {
  const columns = [
    { name: "ID", options: { filter: false } },
    { name: "Name", options: { filter: false } },
    { name: "Age Limit", options: { filter: false } },
    { name: "Status", options: { filter: false } },
    { name: "No of People", options: { filter: false } },
    { name: "Price", options: { filter: false } },
    { name: "Date", options: { filter: false } },
    // {
    //   name: "Ações",
    //   options: {
    //     filter: true,
    //     customBodyRender: (value, tableMeta, updateValue) => {
    //       return (
    //         <button
    //           onClick={() => {
    //             editButton(tableMeta.rowData);
    //           }}
    //           className="button muted-button"
    //         >
    //           Editar
    //         </button>
    //       );
    //     },
    //   },
    // },
  ];
  return (
    <Box
      sx={{
        pt: 6,
        pb: { xs: 12, md: 6 },
        px: { xs: 3, sm: 6, md: 6 },
      }}
    >
      <Typography
        component="h2"
        sx={{
          textAlign: "left",
          fontSize: { xs: 20, md: 30 },
          fontWeight: "700",
          color: "#001E3C",
          mb: 3,
        }}
      >
        Past Requests
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell>{column.name}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((request) => (
              <TableRow>
                <TableCell>{request.id}</TableCell>
                <TableCell>{request.modelName}</TableCell>
                <TableCell>{request.ageLimit}</TableCell>
                <TableCell>{request.status}</TableCell>
                <TableCell>{request.noOfPeople}</TableCell>
                <TableCell>{request.price}</TableCell>
                <TableCell>{request.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ResearcherDashboard;
