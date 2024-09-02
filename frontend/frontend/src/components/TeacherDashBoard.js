import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Avatar,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import ClassIcon from "@mui/icons-material/Class";
import GradeIcon from "@mui/icons-material/Grade";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useLocation, useNavigate } from "react-router-dom";

const TeacherDashboard = () => {
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

  console.log(data);

  const handleNavigate = (path) => {
    navigate(path, { state: { data: data } });
  };

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <AppBar position="static" sx={{ backgroundColor: "#3f51b5" }}>
        <Toolbar>
          <SchoolIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Teacher Dashboard
          </Typography>
          <Avatar
            alt="Teacher Name"
            src="/static/images/avatar/1.jpg"
            onClick={handleAvatarClick}
          />
        </Toolbar>
      </AppBar>

      <Grid container spacing={4} sx={{ p: 4 }}>
        {/* Courses Section */}
        <Grid item xs={12} md={6}>
          <Card sx={{ minHeight: 200, backgroundColor: "#e3f2fd" }}>
            <CardContent>
              <Typography variant="h5" component="div" sx={{ mb: 2 }}>
                <ClassIcon sx={{ mr: 1 }} /> Your Courses
              </Typography>
              <Typography variant="body1" color="text.secondary">
                View the courses you are teaching.
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 2, backgroundColor: "#3f51b5" }}
                onClick={async () => {
                  console.log(data);
                  const response = await axios.post(
                    "http://localhost:3001/iiitn/course",
                    data
                  );
                  // console.log("Courses:");
                  // console.log(response);
                  navigate("/courses", {
                    state: { data: response.data },
                  });
                }}
              >
                Manage Courses
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Student Performance Section */}
        <Grid item xs={12} md={6}>
          <Card sx={{ minHeight: 200, backgroundColor: "#ffebee" }}>
            <CardContent>
              <Typography variant="h5" component="div" sx={{ mb: 2 }}>
                <GradeIcon sx={{ mr: 1 }} /> Student Performance
              </Typography>
              <Typography variant="body1" color="text.secondary">
                View and update student grades, attendance, and performance
                metrics.
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 2, backgroundColor: "#e53935" }}
                onClick={() => {
                  handleNavigate("/StudentPerformance");
                }}
              >
                View Performance
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Grade Submission Section */}
        <Grid item xs={12} md={6}>
          <Card sx={{ minHeight: 200, backgroundColor: "#e8f5e9" }}>
            <CardContent>
              <Typography variant="h5" component="div" sx={{ mb: 2 }}>
                <GradeIcon sx={{ mr: 1 }} /> Grade Submission
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Submit or update student grades for the courses you are
                teaching.
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 2, backgroundColor: "#4caf50" }}
                onClick={() => {
                  handleNavigate("/UpdateMarks");
                }}
              >
                Submit Grades
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Profile Management Section */}
        <Grid item xs={12} md={6}>
          <Card sx={{ minHeight: 200, backgroundColor: "#fce4ec" }}>
            <CardContent>
              <Typography variant="h5" component="div" sx={{ mb: 2 }}>
                <AccountCircleIcon sx={{ mr: 1 }} /> Your Profile
              </Typography>
              <Typography variant="body1" color="text.secondary">
                View and update your profile information, including contact
                details and qualifications.
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 2, backgroundColor: "#d81b60" }}
                onClick={() => {
                  handleNavigate("/profile");
                }}
              >
                Update Profile
              </Button>
            </CardContent>
          </Card>
        </Grid>
        {/* Exam time table */}
        <Grid item xs={12} md={6}>
          <Card sx={{ minHeight: 200, backgroundColor: "#fce4ec" }}>
            <CardContent>
              <Typography variant="h5" component="div" sx={{ mb: 2 }}>
                <AccountCircleIcon sx={{ mr: 1 }} /> Exam TimeTable
              </Typography>
              <Typography variant="body1" color="text.secondary">
                View and update the Exam TimeTable.
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 2, backgroundColor: "#d81b60" }}
                onClick={() => {
                  window
                    .open(
                      "https://docs.google.com/spreadsheets/d/1z5qPloAoPbPF1NIUJrEXW39HAZ6ITtTHIadYmUamzIM/edit",
                      "_blank"
                    )
                    .focus();
                }}
              >
                Go to Time Table
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TeacherDashboard;
