import * as React from "react";

import { Box, Typography } from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { PastRequestsList } from "./PastRequestsList";


const Dashboard = () => {
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
            {/* Map all the past requests in tablecells */}
            <PastRequestsList />
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Dashboard;
