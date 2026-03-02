import type React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import type { UserInterface } from "../types";

interface props {
  users: Array<UserInterface>;
}

export const UsersTable = ({  users}: props): React.JSX.Element => {
  return <Table>
    <TableHead>
      <TableRow>
        <TableCell>Email</TableCell>
        <TableCell>Name</TableCell>
        <TableCell>Role</TableCell>
        <TableCell>Created at</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {users.map((user) => (
        <TableRow key={user.id}>
          <TableCell>{user.email}</TableCell>
          <TableCell>{user.full_name}</TableCell>
          <TableCell>{user.role}</TableCell>
          <TableCell>{user.created_at}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
}
