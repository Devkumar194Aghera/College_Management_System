import React from "react";
import "./PerformancePage.css"; // Import the CSS file
import { useLocation, useNavigate } from "react-router-dom";

function getData(data) {
  // let departments = [{ a: 1 }, { a: 1 }, { a: 1 }, { a: 1 }, { a: 1 }];
  console.log("data");
  data = data.data;
  console.log(data);
  const departments = [
    { name: Object.keys(data[0]), marks: Object.values(data[0]) },
    { name: Object.keys(data[1]), marks: Object.values(data[1]) },
    { name: Object.keys(data[2]), marks: Object.values(data[2]) },
    { name: Object.keys(data[3]), marks: Object.values(data[3]) },
    { name: Object.keys(data[4]), marks: Object.values(data[4]) },
  ];
  return departments;
}

const MarksTable = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.data;
  // Convert the data object into an array of departments
  const departments = getData(data);
  console.log(data);
  return (
    <div className="table-container">
      <h2 className="table-heading">Performance 👏👏👏</h2>
      <table className="marks-table">
        <thead>
          <tr>
            <th>Department</th>
            <th>Marks</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((dep, index) => (
            <tr key={index}>
              <td>{dep.name}</td>
              <td>{dep.marks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MarksTable;
