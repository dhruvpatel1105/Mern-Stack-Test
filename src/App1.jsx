import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import "./App.css";

import * as XLSX from "xlsx";
import { Box } from "@mui/material";

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

const data = [
  {
    id: 1,
    lastName: "Doe",
    firstName: "John",
    dob: "1990-05-20",
    role: "Developer",
  },
  {
    id: 2,
    lastName: "Smith",
    firstName: "Alice",
    dob: "1988-11-12",
    role: "Designer",
  },
  {
    id: 3,
    lastName: "Johnson",
    firstName: "Jane",
    dob: "1995-09-08",
    role: "Manager",
  },
  {
    id: 4,
    lastName: "Williams",
    firstName: "Michael",
    dob: "1985-03-15",
    role: "Engineer",
  },
  {
    id: 5,
    lastName: "Brown",
    firstName: "Emily",
    dob: "1992-07-25",
    role: "Analyst",
  },
  {
    id: 6,
    lastName: "Martinez",
    firstName: "Daniel",
    dob: "1987-12-10",
    role: "Administrator",
  },
  {
    id: 7,
    lastName: "Jones",
    firstName: "Sophia",
    dob: "1998-02-18",
    role: "Coordinator",
  },
  {
    id: 8,
    lastName: "Garcia",
    firstName: "Matthew",
    dob: "1993-06-05",
    role: "Consultant",
  },
  {
    id: 9,
    lastName: "Taylor",
    firstName: "Olivia",
    dob: "1986-09-30",
    role: "Supervisor",
  },
  {
    id: 10,
    lastName: "Clark",
    firstName: "David",
    dob: "1991-11-03",
    role: "Team Lead",
  },
];

export default function App1() {
 
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [id, setId] = useState("");
  const [dob, setdob] = useState("");
  const [role, setrole] = useState("");
  const [file, setFile] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  const [excelData, setExcelData] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      const newRows = rows.slice(1).map((i) => {
        return {
          id: i[0],
          firstName: i[1],
          lastName: i[2],
          dob: new Date(formatDate(i[3])).toISOString().split("T")[0],
          role: i[4],
        };
      });

      for (let i = 0; i < newRows.length; i++) {
        try {
          const response = await fetch("http://localhost:3000/api/saveData", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newRows[i]),
          });

          if (response.ok) {
            const responseData = await response.json();
            console.log("response data");
            console.log(responseData);
          } else {
            console.error("Error:", response.statusText);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }

      setExcelData(newRows);
    };

    reader.readAsArrayBuffer(file);
  };

  const formatDate = (dateString) => {
    if (typeof dateString !== "string") {
      return dateString;
    }

    const parts = dateString.split("-");
    if (parts.length !== 3) {
      return dateString;
    }

    return parts[2] + "-" + parts[1] + "-" + parts[0];
  };

  React.useEffect(() => {
    console.log(excelData);
  }, [excelData]);

  const addToArray = async () => {
    const data = {
      id: id,
      lastName: lname,
      firstName: fname,
      dob: dob,
      role: role,
    };
    const newArray = [...excelData, data];

    try {
      const response = await fetch("http://localhost:3000/api/saveData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("response data");
        console.log(responseData);
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setExcelData(newArray);
    console.log(newArray);
    setFname("");
    setdob("");
    setLname("");
    setId("");
    setrole("");
  };
  const handleEditSelectedRows = () => {
    console.log("Selected Rows:", selectedRows);
  };

  return (
    
    <div>
      <h1
        className="text-center font-bold text-4xl "
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "40px",
          color: "GrayText",
          fontFamily: "serif",
        }}
      >
        Import Excel File
      </h1>

      <section>
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
          <div className="text-center">
            <PhotoIcon
              className="mx-auto h-12 w-12 text-gray-300"
              aria-hidden="true"
            />
            <div className="mt-4 flex text-sm leading-6 text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
              >
                <span>Upload a file</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  onChange={handleFileUpload}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs leading-5 text-gray-600">
              importing requires Microsoft Excel .xlsx formate up to 10MB
            </p>
          </div>
        </div>
      </section>
      <section>
        <input
          type="text"
          placeholder="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="border-solid border-2 "
        />
        <input
          type="text"
          placeholder="First Name"
          value={fname}
          onChange={(e) => setFname(e.target.value)}
          className="border-solid border-2 "
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lname}
          onChange={(e) => setLname(e.target.value)}
          className="border-solid border-2 "
        />

        <input
          type="date"
          placeholder="dob"
          value={dob}
          onChange={(e) => setdob(e.target.value)}
          className="border-solid border-2 "
        />
        <input
          type="text"
          placeholder="role"
          value={role}
          onChange={(e) => setrole(e.target.value)}
          className="border-solid border-2 "
        />
        <button
          onClick={addToArray}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add
        </button>
        <button
          onClick={handleEditSelectedRows}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Edit Selected Rows
        </button>
      </section>
      <section>
        <h1
          style={{
            width: "100%",
            margin: "20px",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "40px",
            color: "GrayText",
            fontFamily: "serif",
          }}
        >
          Employee data
        </h1>
      </section>
      <section>
        <div style={{ height: 400, width: "100%", display: "grid" }}>
          <DataGrid
            rows={excelData}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            disableColumnMenu={true}
          
          />
        </div>
      </section>

    </div>
  );
}