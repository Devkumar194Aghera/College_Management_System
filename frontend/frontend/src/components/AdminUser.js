import AddUser from "./AdminAddUser";
import ModifyUser from "./AdminModifyUser";
import DeleteUser from "./AdminDeleteUser";
import React, { useState } from "react";
import {
  Box,
  Container,
  Paper,
  Button,
  Stack,
  Typography,
} from "@mui/material";

const AdminStudentManager = () => {
  const [action, setAction] = useState(""); // "add", "modify", "delete"

  const renderComponent = () => {
    switch (action) {
      case "add":
        return <AddUser />;
      case "modify":
        return <ModifyUser />;
      case "delete":
        return <DeleteUser />;
      default:
        return <Typography>Select an action to get started.</Typography>;
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Manage Users
        </Typography>
        <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
          <Button variant="contained" onClick={() => setAction("add")}>
            Add User
          </Button>
          <Button variant="contained" onClick={() => setAction("modify")}>
            Modify or View User
          </Button>
          <Button variant="contained" onClick={() => setAction("delete")}>
            Delete User
          </Button>
        </Stack>
        <Box>{renderComponent()}</Box>
      </Paper>
    </Container>
  );
};

export default AdminStudentManager;
