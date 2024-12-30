const express = require("express");
const router = express.Router(); //creates express router

const Employee = require("../models/Employee");

router.post("/", async (req, res) => {
  const { empId, first_name, last_name, salary, department } = req.body;
  try {
    const newEmployee = new Employee({
      empId,
      first_name,
      last_name,
      salary,
      department,
    });
    await newEmployee.save(); //save data in mongo db
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find(); //retrieve data from mongo db
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:empId", async (req, res) => {
  try {
    const { empId } = req.params;
    console.log(empId);
    const deleteEmployee = await Employee.findOneAndDelete({ empId }); //delete one employee with empID
    if (deleteEmployee) {
      return res.status(200).send({ message: `${empId} deleted succesfully` });
    } else {
      return res.status(500).send({ message: `${empId} not found` });
    }
  } catch (e) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:empId", async (req, res) => {
  try {
    const { empId } = req.params;
    const updatedData = req.body;
    console.log("put request", { empId });
    const updateEmployee = await Employee.findOneAndUpdate(
      { empId },
      updatedData,
      { new: true, runValidators: true }
    );
    if (updateEmployee) {
      return res.status(200).send({ message: `${empId} updated successfully` }); //update one employee with empID
    } else {
      return res.status(500).send({ message: `${empId} not found` });
    }
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

module.exports = router;
