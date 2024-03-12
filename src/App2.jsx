import React, { useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import "./App.css";
import * as XLSX from "xlsx";
import { Box } from "@mui/material";
import { ReactSpreadsheetImport } from "react-spreadsheet-import";
const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 150 },
  { field: "lastName", headerName: "Last name", width: 150 },
  {
    field: "dob",
    headerName: "dob",
    width: 150,
  },
  {
    field: "role",
    headerName: "role",
    width: 160,
  },
];


export default function App2() {
  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const [isOpen, setIsOpen] = useState(false); // State variable to manage modal visibility

  
  // Function to handle modal close
  const handleClose = () => {
    setIsOpen(false);
  };

  // Function to handle modal submit
  const handleSubmit = (data) => {
    // Handle your modal submission here
    console.log("Submitted data:", data);
    handleClose(); // Close the modal after submission
  };
  const fields = [
    {
   
      label: "Name",
      
      key: "name",
      
      alternateMatches: ["first name", "first"],
     
      fieldType: {
       
        type: "input",
      },
      // Used in the first step to provide an example of what data is expected in this field. Optional.
      example: "Stephanie",
      // Can have multiple validations that are visible in Validation Step table.
      validations: [
        {
          // Can be "required" / "unique" / "regex"
          rule: "required",
          errorMessage: "Name is required",
          // There can be "info" / "warning" / "error" levels. Optional. Default "error".
          level: "error",
        },
      ],
    },
  ] ;

  return (
    <div>
    <h1>hello</h1>

    <ReactSpreadsheetImport  isOpen={true} onClose={handleClose} onSubmit={handleSubmit}  fields={fields} />
          </div>
  );
}
