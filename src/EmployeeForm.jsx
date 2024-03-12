// EmployeeForm.js
import React, { memo } from "react";

function EmployeeForm(props) {
  const {
    fname,
    lname,
    dob,
    role,
    salary,
    setFname,
    setLname,
    setdob,
    setrole,
    addToArray,
    setSalary,
  } = props;

  console.log("EmployeeForm render");
  return (
    <form
      className="flex flex-wrap items-center justify-center mt-10"
      onSubmit={addToArray}
    >
      <input
        type="text"
        placeholder="First Name"
        value={fname}
        onChange={(e) => setFname(e.target.value)}
        className="border-solid border-2 p-2 mb-2 lg:mb-0 lg:mr-2 w-full lg:w-auto"
        required
      
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lname}
        onChange={(e) => setLname(e.target.value)}
        className="border-solid border-2 p-2 mb-2 lg:mb-0 lg:mr-2 w-full lg:w-auto"
        required

      />
      <input
        type="date"
        placeholder="DOB"
        value={dob}
        onChange={(e) => setdob(e.target.value)}
        className="border-solid border-2 p-2 mb-2 lg:mb-0 lg:mr-2 w-full lg:w-auto"
        required
      />
      <input
        type="text"
        placeholder="Role"
        value={role}
        onChange={(e) => setrole(e.target.value)}
        className="border-solid border-2 p-2 mb-2 lg:mb-0 lg:mr-2 w-full lg:w-auto"
        required
      />
      <input
        type="number"
        placeholder="salary"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
        className="border-solid border-2 p-2 mb-2 lg:mb-0 lg:mr-2 w-full lg:w-auto"
        min={10000}
        max={100000}
      />

      <input
        type="submit"
        value="add"
        className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded cursor-pointer transition duration-300"
      />
    </form>
  );
}

export default memo(EmployeeForm);
