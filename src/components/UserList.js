import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`http://localhost:5000/users/${id}`)
        .then(() => setUsers(users.filter((user) => user.id !== id)))
        .catch((error) => console.error(error));
    }
  };

  return (
    <div className="container">
      <h1>User Management</h1>
      <div className="linkBtn">
        <Link to="/add">Add User</Link>
      </div>
      {/* <ul className="user-list">
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.role} - {user.status} - {user.email} -{" "}
            {user.creationDate}
            <div>
              <Link to={`/edit/${user.id}`}>Edit</Link>
              <button onClick={() => handleDelete(user.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul> */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Role</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
              <StyledTableCell align="right">creationDate</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <StyledTableRow key={user.name}>
                <StyledTableCell component="th" scope="row">
                  {user.name}
                </StyledTableCell>
                <StyledTableCell align="right">{user.role}</StyledTableCell>
                <StyledTableCell align="right">{user.status}</StyledTableCell>
                <StyledTableCell align="right">{user.email}</StyledTableCell>
                <StyledTableCell align="right">
                  {user.creationDate}
                </StyledTableCell>
                <StyledTableCell>
                  <Link to={`/edit/${user.id}`} className="link-button">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserList;
