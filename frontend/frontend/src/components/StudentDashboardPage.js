import React, { useState, useEffect } from "react";
import "./StudentDashboardPage.css";
import axios from "axios";
import { AppBar, Toolbar, Typography, Avatar } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import { useLocation, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.data;
  const [isLoggedIn, setIsLoggedIn] = useState("true");
  localStorage.setItem("isLoggedIn", isLoggedIn);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedInStatus);

    if (!loggedInStatus) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const handleAvatarClick = () => {
    if (isLoggedIn) {
      localStorage.removeItem("isLoggedIn");
      setIsLoggedIn(false);
      navigate("/", { replace: true });
    } else {
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
    }
  };

  const handleNavigate = (path) => {
    navigate(path, { state: { data: data } });
  };

  return (
    <div className="dashboard-container">
      <AppBar position="static" sx={{ backgroundColor: "#0096FF" }}>
        <Toolbar>
          <SchoolIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Student Dashboard
          </Typography>
          <Avatar
            alt="Student Name"
            src="/static/images/avatar/1.jpg"
            onClick={handleAvatarClick}
            style={{ cursor: "pointer" }} // Add cursor pointer for better UX
          />
        </Toolbar>
      </AppBar>
      <header className="dashboard-header">
        <h1>Welcome, {data?.NAME || "User"}!</h1>
      </header>
      <section className="dashboard-options">
        <div
          className="option-card"
          onClick={() => {
            handleNavigate("/updateDetails");
          }}
        >
          <h2>Update Details</h2>
          <p>Change your password, update contact info, etc.</p>
        </div>

        <div
          className="option-card"
          onClick={async () => {
            const response = await axios.post(
              "http://localhost:3001/iiitn/performance",
              data
            );
            navigate("/performance", {
              state: { data: response.data },
            });
          }}
        >
          <h2>See Performance</h2>
          <p>View your grades and academic performance.</p>
        </div>

        <div
          className="option-card"
          onClick={() => {
            window
              .open(
                "https://docs.google.com/spreadsheets/d/1z5qPloAoPbPF1NIUJrEXW39HAZ6ITtTHIadYmUamzIM/edit?usp=sharing",
                "_blank"
              )
              .focus();
          }}
        >
          <h2>See Exam Schedule</h2>
          <p>Check your upcoming exams and timetable.</p>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
