const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    empId: { type: String, required: true, unique: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    salary: { type: Number, required: true },
    department: { type: String, required: true },
  },
  { timestamps: true } //automatically add createdAt and updatedAt timestamps
);
module.exports = mongoose.model("Employee", employeeSchema);
