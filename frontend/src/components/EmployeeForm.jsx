/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Paper,
  Typography,
  Container,
  TextField,
  Button,
  Box,
} from "@mui/material";

const EmployeeForm = ({ editData, setEditData, fetchEmployees }) => {
  const [formData, setFormData] = useState({
    empId: "",
    first_name: "",
    last_name: "",
    salary: "",
    department: "",
  });

  useEffect(() => {
    if (editData) {
      // console.log(editData);
      setFormData(editData);
    }
  }, [editData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editData) {
        // console.log(editData, editData.empId);
        await axios.put(
          `http://localhost:4000/employees-route/${editData.empId}`,
          formData
        );
        alert("Employee Updated Successfully");
        setFormData({
          empId: "",
          first_name: "",
          last_name: "",
          salary: "",
          department: "",
        });
        setEditData(null);
        fetchEmployees();
      } else {
        await axios.post("http://localhost:4000/employees-route", formData);
        alert("Employee Added Successfully");
        fetchEmployees();
        setFormData({
          empId: "",
          first_name: "",
          last_name: "",
          salary: "",
          department: "",
        });
      }
    } catch (e) {
      alert("Error Adding Employee: " + e.message);
    }
  };

  // console.log(formData);
  return (
    <Paper>
      <Container maxWidth="md" align="center">
        <Typography variant="h4" gutterBottom>
          EMPLOYEE DETAILS
        </Typography>
        <Box
          component="form"
          sx={{
            display: "flex",
            width: 300,
            flexDirection: "column",
            gap: ".5rem",
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            name="empId"
            label="Employee ID"
            variant="outlined"
            onChange={handleChange}
            value={formData.empId}
          />
          <TextField
            id="outlined-basic"
            name="first_name"
            label="First Name"
            variant="outlined"
            onChange={handleChange}
            value={formData.first_name}
          />
          <TextField
            id="outlined-basic"
            name="last_name"
            label="Last Name"
            variant="outlined"
            onChange={handleChange}
            value={formData.last_name}
          />
          <TextField
            id="filled-basic"
            name="salary"
            label="Salary"
            variant="outlined"
            onChange={handleChange}
            value={formData.salary}
          />
          <TextField
            id="standard-basic"
            name="department"
            label="Department"
            variant="outlined"
            onChange={handleChange}
            value={formData.department}
          />
          <Button type="submit" variant="contained" onClick={handleSubmit}>
            {editData ? "Edit Employee" : "Add Employee"}
          </Button>
        </Box>
      </Container>
    </Paper>
  );
};
export default EmployeeForm;
