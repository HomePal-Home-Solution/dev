import { useState } from "react";
import { Link } from "react-router-dom";
import { TextField, Button, Container, Box, Typography, Paper } from "@mui/material";

export default function SignIn() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signing in with", formData);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ p: 4, mt: 8, borderRadius: 2 }}>
        <Typography variant="h5" component="h1" align="center" gutterBottom>
          Sign In
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
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
            Sign In
          </Button>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}