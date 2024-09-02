import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Typography from "@mui/material/Typography";
import {
  Container,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  Grid,
} from "@mui/material";
import { styled } from "@mui/system";

const CustomContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  backgroundColor: "#f5f5f5",
});

const FormBox = styled(Box)({
  padding: "2rem",
  backgroundColor: "white",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
  maxWidth: "400px",
  width: "100%",
});

const LoginPage = () => {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleLogin = async () => {
    try {
      const backendRequestURL = "http://localhost:3001/iiitn/login";
      const response = await axios.post(backendRequestURL, {
        email,
        password,
        role,
      });

      if (response.data.success) {
        setUserData(response.data.data[0]);
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true"); // Set isLoggedIn to true in localStorage
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
      alert("Login failed. Please check your credentials and try again.");
    }
  };

  // Redirect to the appropriate dashboard if logged in
  if (isLoggedIn) {
    if (role === "student")
      return <Navigate to="/sdashboard" replace state={{ data: userData }} />;
    if (role === "teacher")
      return <Navigate to="/tdashboard" replace state={{ data: userData }} />;
    if (role === "admin")
      return <Navigate to="/adashboard" replace state={{ data: userData }} />;
  }

  return (
    <CustomContainer>
      <FormBox>
        <Typography variant="h4" gutterBottom align="center" color="primary">
          Login
        </Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel>User Role</InputLabel>
          <Select
            value={role}
            onChange={handleRoleChange}
            label="User Role"
            required
          >
            <MenuItem value="student">Student</MenuItem>
            <MenuItem value="teacher">Instructor</MenuItem>
            <MenuItem value="admin">Administrator</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="User Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          required
        />
        {(role === "student" || role === "teacher" || role === "admin") && (
          <TextField
            fullWidth
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
            type="password"
          />
        )}
        <Grid container justifyContent="center" mt={2}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleLogin}
          >
            Login
          </Button>
        </Grid>
      </FormBox>
    </CustomContainer>
  );
};

export default LoginPage;
