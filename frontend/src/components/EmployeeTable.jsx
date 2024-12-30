import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  Container,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
const EmployeeTable = ({ setEditData, fetchEmployees, employees }) => {
  useEffect(() => {}, [setEditData]);
  const editDocument = async (emp) => {
    setEditData(emp);
  };
  useEffect(() => {
    fetchEmployees();
  }, []);

  const deleteDocument = async (empId) => {
    try {
      axios.delete(`http://localhost:4000/employees-route/${empId}`);
      alert("Employee Deleted Successfully");
      fetchEmployees(); // Refresh the table data after deletion
    } catch (e) {
      alert("Error Deleting Employee: " + e.message);
    }
  };

  return (
    <Container>
      <Paper sx={{ margin: "4rem" }} elevation={2}>
        <Typography variant="h4" gutterBottom>
          EMPLOYEE TABLE
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Delete</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((emp) => (
              <TableRow key={emp.empId}>
                <TableCell>{emp.empId}</TableCell>
                <TableCell>{emp.first_name}</TableCell>
                <TableCell>{emp.last_name}</TableCell>
                <TableCell>{emp.salary}</TableCell>
                <TableCell>{emp.department}</TableCell>

                <TableCell>
                  <DeleteIcon
                    sx={{ cursor: "pointer" }}
                    onClick={() => deleteDocument(emp.empId)}
                  />
                </TableCell>
                <TableCell>
                  <EditIcon
                    sx={{ cursor: "pointer" }}
                    onClick={() => editDocument(emp)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};
export default EmployeeTable;
