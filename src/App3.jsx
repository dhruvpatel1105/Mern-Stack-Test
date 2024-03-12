import React, { useEffect, useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import "./App.css";
import * as XLSX from "xlsx";

import Ex from './Ex';
import Upload from "./Upload";
import EmployeeForm from "./EmployeeForm";
import EmployeeDataTable from "./EmployeeDataTable";
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

export default function App3() {
  const [rows, setRows] = useState(data);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [id, setId] = useState("");
  const [dob, setdob] = useState("");
  const [role, setrole] = useState("");
  const [file, setFile] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showComponent, setShowComponent] = useState(false);
  const [excelData, setExcelData] = useState([]);
  const handleClick = () => {
    setShowComponent(true);
  };
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Desktops",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: "Product Trends by Month",
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
        ],
      },
    },
  });

  

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
          id: Math.floor(Math.random() * 10000) + 1,
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

      setExcelData([...excelData, ...newRows]);
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
    fetchData();
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3000/api/saveData");

        if (response.ok) {
          const responseData = await response.json();
          console.log("response data");
          console.log(responseData);
          const newRows = responseData.map((i) => {
            const date = new Date(i.dob);

            const formattedDate = date.toISOString().split("T")[0];
            return {
              id: i.id,
              firstName: i.first_name,
              lastName: i.last_name,
              dob: formattedDate,
              role: i.role,
            };
          });
          console.log(newRows);
          setExcelData(newRows);
        } else {
          console.error("Error:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
      return;
    }
  }, []);

  const addToArray = async () => {
    const data = {
      id: Math.floor(Math.random() * 10000) + 1,
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
  const deleteItem = async (row) => {
    try {
      await fetch(`http://localhost:3000/api/saveData/${row.id}`, {
        method: "DELETE",
      });
    } catch (error) {}

    setExcelData((prevData) => {
      const index = prevData.findIndex((item) => item.id === row.id);
      return [...prevData.slice(0, index), ...prevData.slice(index + 1)];
    });
  };

  useEffect(() => {
    console.log(chartData);
  }, []);

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
      <button onClick={handleClick}>Show Chart</button>
      { showComponent && <Ex />}
      <Upload handleFileUpload={handleFileUpload} />
     {/*  <section>
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
      </section> */}
    {/*   <section className="flex flex-wrap items-center justify-center mt-10">
        <input
          type="text"
          placeholder="First Name"
          value={fname}
          onChange={(e) => setFname(e.target.value)}
          className="border-solid border-2 p-2 mb-2 lg:mb-0 lg:mr-2 w-full lg:w-auto"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lname}
          onChange={(e) => setLname(e.target.value)}
          className="border-solid border-2 p-2 mb-2 lg:mb-0 lg:mr-2 w-full lg:w-auto"
        />
        <input
          type="date"
          placeholder="DOB"
          value={dob}
          onChange={(e) => setdob(e.target.value)}
          className="border-solid border-2 p-2 mb-2 lg:mb-0 lg:mr-2 w-full lg:w-auto"
        />
        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setrole(e.target.value)}
          className="border-solid border-2 p-2 mb-2 lg:mb-0 lg:mr-2 w-full lg:w-auto"
        />
        <button
          onClick={addToArray}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-200"
        >
          Add
        </button>
      </section> */}
      <EmployeeForm  
        fname={fname}
        lname={lname}
        dob={dob}
        role={role}
        setFname={setFname}
        setLname={setLname}
        setdob={setdob}
        setrole={setrole}
        addToArray={addToArray}/>
      <EmployeeDataTable excelData={excelData} deleteItem={deleteItem}/>
{/*       <section>
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
          <table
            style={{ width: "100%", borderCollapse: "collapse" }}
            className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
          >
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th style={{ border: "1px solid black" }} className="p-4">
                  Select
                </th>
                <th style={{ border: "1px solid black" }} className="px-6 py-3">
                  ID
                </th>
                <th style={{ border: "1px solid black" }} className="px-6 py-3">
                  First Name
                </th>
                <th style={{ border: "1px solid black" }} className="px-6 py-3">
                  Last Name
                </th>
                <th style={{ border: "1px solid black" }} className="px-6 py-3">
                  DOB
                </th>
                <th style={{ border: "1px solid black" }} className="px-6 py-3">
                  Role
                </th>
                <th style={{ border: "1px solid black" }} className="px-6 py-3">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {excelData.map((row, index) => (
                <tr
                  key={row.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td style={{ border: "1px solid black" }} className="w-4 p-4">
                    <input type="checkbox" />
                  </td>
                  <td
                    style={{ border: "1px solid black" }}
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {row.id}
                  </td>
                  <td
                    style={{ border: "1px solid black" }}
                    className="px-6 py-4"
                  >
                    {row.firstName}
                  </td>
                  <td
                    style={{ border: "1px solid black" }}
                    className="px-6 py-4"
                  >
                    {row.lastName}
                  </td>
                  <td
                    style={{ border: "1px solid black" }}
                    className="px-6 py-4"
                  >
                    {row.dob}
                  </td>
                  <td
                    style={{ border: "1px solid black" }}
                    className="px-6 py-4"
                  >
                    {row.role}
                  </td>
                  <td
                    style={{ border: "1px solid black" }}
                    className="px-6 py-4"
                  >
                    <button
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={() => deleteItem(row)}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section> */}
     
    </div>
  );
}
