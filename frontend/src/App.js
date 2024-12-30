import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeTable from "./components/EmployeeTable";

function App() {
  const [editData, setEditData] = useState(null);
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    await axios
      .get("http://localhost:4000/employees-route")
      .then((res) => setEmployees(res.data))
      .catch((e) => alert("error fetching employees"));
  };

  useEffect(() => {
    fetchEmployees();
  }, []);
  return (
    <div className="App">
      <EmployeeForm
        fetchEmployees={fetchEmployees}
        editData={editData}
        setEditData={setEditData}
      />

      <EmployeeTable
        employees={employees}
        fetchEmployees={fetchEmployees}
        setEditData={setEditData}
      />
    </div>
  );
}

export default App;
