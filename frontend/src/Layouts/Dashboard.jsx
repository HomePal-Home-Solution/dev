import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const updateTime = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    // Set greeting based on time of day
    const hours = new Date().getHours();
    if (hours < 12) {
      setGreeting("Good Morning");
    } else if (hours < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }

    return () => clearInterval(updateTime); // Clean up interval on unmount
  }, []);

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <div style={{ display: "flex", padding: "20px", backgroundColor: "#f4f4f4", minHeight: "100vh", borderRadius: "10px" }}>
      {/* Left Section (Folders) */}
      <div style={{ flex: 3, padding: "20px", margin: "30px" }}>
        {/* Dashboard Header */}
        <Typography variant="h4" gutterBottom style={{ fontSize: "2.5rem", fontWeight: "bold"}}>
          Dashboard
        </Typography>
        {/* Welcome Message and Time */}
        <Typography variant="h6" gutterBottom>
          {greeting}, User! The current time is {currentTime}
        </Typography>

        {/* Manage Section */}
        <Typography variant="h5" gutterBottom style={{ fontSize: "2rem", marginTop: "30px", marginBottom: "20px"}}>
          Manage Section
        </Typography>
        <Grid container spacing={3}>
          {[{ title: "Item Management", color: "#e57373", path: "/allitem" },
            { title: "Shopping List", color: "#64b5f6", path: "/create-shopping" },
            { title: "Meal Planner", color: "#ffd54f", path: "/mealPlanner" }].map((folder, index) => (
            <Grid item xs={12} sm={4} key={index} style={{ cursor: "pointer" }}>
              <Card
                style={{ backgroundColor: folder.color, color: "white" }}
                onClick={() => handleCardClick(folder.path)}
              >
                <CardContent>
                  <Typography variant="h6">{folder.title}</Typography>
                  <Typography>Click Here</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>

      {/* Right Section (Calendar & Tasks) */}
      <div style={{ flex: 1, marginRight: "30px" }}>
        {/* Calendar Section */}
        <Card style={{ marginBottom: "20px", textAlign: "center", padding: "10px" }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Calendar
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar />
            </LocalizationProvider>
          </CardContent>
        </Card>

        {/* Task Section */}
        <Card>
          <CardContent>
            <Typography variant="h6">Your Task</Typography>
            <Typography color="textSecondary">Review meal plan with the team</Typography>
            <Typography variant="body2" color="textSecondary">7 Dec, 2019 | 10:00 AM</Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
