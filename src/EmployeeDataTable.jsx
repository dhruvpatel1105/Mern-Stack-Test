
import React, { memo } from "react";

function EmployeeDataTable(props) {
  console.log("EmployeeDataTable render");
  return (
    <div>
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
          <table
            style={{ width: "100%", borderCollapse: "collapse" }}
            className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
          >
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
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
                  Salary
                </th>
                <th style={{ border: "1px solid black" }} className="px-6 py-3">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {props.excelData.map((row, index) => (
                <tr
                  key={row.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
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
                    {row.salary}
                  </td>
                  <td
                    style={{ border: "1px solid black" }}
                    className="px-6 py-4"
                  >
                    <button
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={() => props.deleteItem(row)}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default memo(EmployeeDataTable);
