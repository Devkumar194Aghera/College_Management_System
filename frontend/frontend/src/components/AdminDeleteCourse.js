import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Snackbar,
  Alert,
  Stack,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const DeleteCourse = () => {
  const [CourseToDelete, setCourseToDelete] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleDeleteCourse = async () => {
    if (!CourseToDelete) {
      setSnackbarMessage("No Course id to delete.");
      setOpenDialog(false);
    }
    let msg = "";
    try {
      const response = await axios.delete(
        `http://localhost:3001/iiitn/adminDeleteCourse/${CourseToDelete}`
      );
      msg = response.data.message;
      if (response.data.success) {
        setSnackbarMessage(response.data.message);
        setOpenDialog(false);
        setOpenSnackbar(true);
        setCourseToDelete("");
      } else {
        setSnackbarMessage("No such course exist");
        setOpenDialog(false);
        setOpenSnackbar(true);
        setCourseToDelete("");
      }
    } catch (error) {
      setSnackbarMessage(msg);
      setOpenDialog(false);
      setOpenSnackbar(true);
      setCourseToDelete("");
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Delete Course
      </Typography>
      <TextField
        fullWidth
        label="Course ID"
        value={CourseToDelete}
        onChange={(e) => setCourseToDelete(e.target.value)}
        variant="outlined"
      />
      <br />
      <br />

      <Button variant="contained" color="secondary" onClick={handleOpenDialog}>
        Delete Course
      </Button>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this Course?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteCourse} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DeleteCourse;