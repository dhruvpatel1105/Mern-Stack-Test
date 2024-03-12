/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState,useCallback } from "react";
import "./App.css";
import * as XLSX from "xlsx";

import Chart from "./Chart";
import Upload from "./Upload";
import EmployeeForm from "./EmployeeForm";
import EmployeeDataTable from "./EmployeeDataTable";





export default function App() {
 
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  
  const [dob, setdob] = useState("");
  const [role, setrole] = useState("");
 
  const [checkUpload, setcheckUpload] = useState(true);
  const [showChart, setShowChart] = useState(false);
  const [excelData, setExcelData] = useState([]);
  
const [salary, setSalary] = useState("")

  const handleClick = () => {
    setShowChart(true);
  };
 

  const handleFileUpload = useCallback((event) => {
    console.log("handle file created");
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
          salary:i[6]
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

      setExcelData([...excelData,...newRows]);
    };

    reader.readAsArrayBuffer(file);
    setcheckUpload(false);
  },[excelData]);

  const formatDate = useCallback((dateString) => {
    if (typeof dateString !== "string") {
      return dateString;
    }

    const parts = dateString.split("-");
    if (parts.length !== 3) {
      return dateString;
    }

    return parts[2] + "-" + parts[1] + "-" + parts[0];
  },[]);

  React.useEffect(() => {
    fetchData();
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3000/api/saveData");

        if (response.ok) {
          const responseData = await response.json();
          console.log(" fetch response data");
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
              salary:i.salary
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

  const addToArray =useCallback(async () => {
    console.log("addto arrya");
    const data = {
      id: Math.floor(Math.random() * 10000) + 1,
      lastName: lname,
      firstName: fname,
      dob: dob,
      role: role,
      salary:salary
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
    
    setrole("");
  },[lname,fname,dob,role,salary]);

  const deleteItem = useCallback(async (row) => {
    try {
      await fetch(`http://localhost:3000/api/saveData/${row.id}`, {
        method: "DELETE",
      });
    } catch (error) {}

    setExcelData((prevData) => {
      const index = prevData.findIndex((item) => item.id === row.id);
      return [...prevData.slice(0, index), ...prevData.slice(index + 1)];
    });
  },[]);

 useEffect(()=>{
  console.log("excel data");
  console.log(excelData);
 },[excelData])

  return (
    <div>
      <section className="flex items-center">
        {checkUpload && !showChart && (
          <span
            className="text-center font-bold text-4xl"
            style={{
              fontWeight: "bold",
              fontSize: "40px",
              color: "GrayText",
              fontFamily: "serif",
            }}
          >
            Import Excel File
          </span>
        )}
        {!showChart&&<button
          onClick={handleClick}
          style={{ marginLeft: "auto" }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-200"
        >
          Show Chart
        </button>}
        {showChart&&<button
          onClick={()=>setShowChart(!showChart)}
          style={{ marginLeft: "auto",width:"115px" }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-200"
        >
          close
        </button>}
      </section>

      {showChart && <Chart excelData={excelData}/>}
      {checkUpload && !showChart && <Upload handleFileUpload={handleFileUpload} />}

      <EmployeeForm
        fname={fname}
        lname={lname}
        dob={dob}
        role={role}
        setFname={setFname}
        setLname={setLname}
        setdob={setdob}
        setrole={setrole}
        addToArray={addToArray}
        salary={salary}
        setSalary={setSalary}
      />
      <EmployeeDataTable excelData={excelData} deleteItem={deleteItem} />
    </div>
  );
}
