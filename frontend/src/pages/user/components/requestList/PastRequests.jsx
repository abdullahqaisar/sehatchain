import * as React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { PastRequestsList } from "./PastRequestsList";
import { SectionHeading } from "../sectionHeading/SectionHeading";
import { useNavigate } from "react-router-dom";

const PastRequests = () => {
  const columns = [
    { name: "ID", options: { filter: false } },
    { name: "Name", options: { filter: false } },
    { name: "Age Limit", options: { filter: false } },
    { name: "Status", options: { filter: false } },
    { name: "No of People", options: { filter: false } },
    { name: "Price", options: { filter: false } },
    { name: "Date", options: { filter: false } },

  ];
  const navigate = useNavigate();
  const handleClick = (link) => navigate(link);

  return (
    <>
      <SectionHeading title="Past Requests" align="left" />
      <TableContainer
        onClick={() => {
          handleClick("../results");
        }}
      >
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
    </>
  );
};

export default PastRequests;
