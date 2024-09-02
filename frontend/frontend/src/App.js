import logo from './logo.svg';
import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import NotFoundPage from "./components/PageNotFound404"; // Optional, for handling 404 errors
import UpdateForm from "./components/UpdatePersonalDetails";
import UpdateProfile from "./components/UpdateProfile";
import PerformancePage from "./components/PerformancePage";
import StudentDashboard from "./components/StudentDashboardPage";
import TeacherDashboard from "./components/TeacherDashBoard";
import AdminDashboard from "./components/AdminDashBoard";
import TeacherCourses from "./components/TeacherCourses";
import CRUDonStudent from "./components/CRUDonStudent";
import AddStudentForm from "./components/AddStudent";
import AdminUser from "./components/AdminUser";
import AdminCourse from "./components/AdminCourse";
import StudentPerformance from "./components/StudentPerformancePage";
import UpdateStudentMarks from "./components/UpdateStudentMarks";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/updateDetails" element={<UpdateForm />} />
        <Route path="/changeStudent" element={<CRUDonStudent />} />
        <Route path="/performance" element={<PerformancePage />} />
        <Route path="/sdashboard" element={<StudentDashboard />} />
        <Route path="/tdashboard" element={<TeacherDashboard />} />
        <Route path="/adashboard" element={<AdminDashboard />} />
        <Route path="/addStudent" element={<AddStudentForm />} />
        <Route path="/ManageUser" element={<AdminUser />} />
        <Route path="/ManageCourse" element={<AdminCourse />} />
        <Route path="/profile" element={<UpdateProfile />} />
        <Route path="/courses" element={<TeacherCourses />} />
        <Route path="/StudentPerformance" element={<StudentPerformance />} />
        <Route path="/UpdateMarks" element={<UpdateStudentMarks />} />
        <Route path="*" element={<NotFoundPage />} />{" "}
      </Routes>
    </Router>
  );
};


export default App;
