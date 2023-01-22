import { requests } from "./requests.data";

import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

export function ListCells() {
  function onClickPage() {
    console.log("Hi");
  }

  return (
    <>
      {requests.map((request) => (
        <TableRow onclick={() => onClickPage()}>
          <TableCell>{request.id}</TableCell>
          <TableCell>{request.modelName}</TableCell>
          <TableCell>{request.ageLimit}</TableCell>
          <TableCell>{request.status}</TableCell>
          <TableCell>{request.noOfPeople}</TableCell>
          <TableCell>{request.price}</TableCell>
          <TableCell>{request.date}</TableCell>
        </TableRow>
      ))}
    </>
  );
}
