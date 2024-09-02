import React from "react";
import "./PerformancePage.css"; // Import the CSS file
import { useLocation, useNavigate } from "react-router-dom";

function getData(data) {
  console.log("data");
  data = data.data;
  console.log(data);

  let length = data.length;
  const courseData = [];
  for (let i = 0; i < length; i++) {
    courseData.push(data[i].CourseName);
  }

  //   const courseData = [
  //     { [c1Name]: performance[0].Course1_Marks },
  //     { [c2Name]: performance[0].Course2_Marks },
  //     { [c3Name]: performance[0].Course3_Marks },
  //     { [c4Name]: performance[0].Course4_Marks },
  //     { [c5Name]: performance[0].Course5_Marks },
  //   ];

  //   const departments = [
  //     { name: Object.keys(data[0]) },
  //     { name: Object.keys(data[1]) },
  //     { name: Object.keys(data[2]) },
  //     { name: Object.keys(data[3]) },
  //     { name: Object.keys(data[4]) },
  //   ];
  return courseData;
}

const TeacherCourses = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.data;

  console.log(data);
  const departments = getData(data);
  return (
    <div className="table-container">
      <h2 className="table-heading">Your Courses 👩‍🏫👨‍🏫</h2>
      <table className="marks-table">
        <thead>
          <tr>
            <th>Department</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((dep, index) => (
            <tr key={index}>
              <td>{dep}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherCourses;
