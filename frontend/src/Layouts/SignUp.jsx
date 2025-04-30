import { useState } from "react";
import { Link } from "react-router-dom";
import { TextField, Button, Container, Box, Typography, Paper } from "@mui/material";

export default function SignUp() {
  const [formData, setFormData] = useState({ email: "", password: "", confirmPassword: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Signing up with", formData);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ p: 4, mt: 8, borderRadius: 2 }}>
        <Typography variant="h5" component="h1" align="center" gutterBottom>
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField 
            fullWidth 
            margin="normal" 
            label="Email" 
            name="email" 
            type="email" 
            onChange={handleChange} 
            required 
          />
          <TextField 
            fullWidth 
            margin="normal" 
            label="Password" 
            name="password" 
            type="password" 
            onChange={handleChange} 
            required 
          />
          <TextField 
            fullWidth 
            margin="normal" 
            label="Confirm Password" 
            name="confirmPassword" 
            type="password" 
            onChange={handleChange} 
            required 
          />
          <Button type="submit" fullWidth variant="contained" color="success" sx={{ mt: 2 }}>
            Sign Up
          </Button>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Already have an account? <Link to="/signin">Sign In</Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
