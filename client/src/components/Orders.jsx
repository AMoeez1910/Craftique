import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export default function Orders(props) {
  return (
    <div>
      <h3>Orders</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>OrderID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.orderData.map((data, idx) => (
            <TableRow key={idx}>
              <TableCell>{idx}</TableCell>
              <TableCell>{data.Status}</TableCell>
              <TableCell>
                {new Date(data.Date).toISOString().split("T")[0]} at {data.Time}
              </TableCell>
              <TableCell>{data.Price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </div>
  );
}
