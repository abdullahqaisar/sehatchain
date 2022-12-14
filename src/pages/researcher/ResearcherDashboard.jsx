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
import { DataGrid } from "@mui/x-data-grid";

import requestData from "./requests.data";

const ResearcherDashboard = () => {
  const columns = [
    { name: "ID", options: { filter: false } },
    { name: "Name", options: { filter: false } },
    { name: "Usuário", options: { filter: false } },
    { name: "E-mail", options: { filter: false } },
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
    <Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Usuário</TableCell>
              <TableCell>E-mail</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              <TableRow >
                <TableCell>{"requestData.id"}</TableCell>
                <TableCell>{"requestData.modelName"}</TableCell>
                <TableCell>{"requestData.ageLimit"}</TableCell>
                <TableCell>{"requestData.status"}</TableCell>
                <TableCell>{"requestData.noOfPeople"}</TableCell>
                {/* <TableCell>{request.price}</TableCell>
                <TableCell>{request.date}</TableCell> */}
              </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ResearcherDashboard;
