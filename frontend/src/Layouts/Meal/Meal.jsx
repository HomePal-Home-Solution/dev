import * as React from 'react';
import './meal.css';
import MealList from '../../Components/Meal/mealList.jsx';
import CreateMeal from '../../Components/Meal/createMealDialog.jsx';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const Meal = () => {
    const [openDialog, setOpenDialog] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };
    
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <div className="right-content">
            {/* Header Section */}
            <div className="meal-header">
                <h1 className="meal-title">Meals Management</h1>
            </div>

            <div className="meal-actions">
                <Button variant="contained" color="primary" className="add-meal-btn" onClick={handleOpenDialog}>
                    Add Meal
                </Button>
                <TextField 
                    id="outlined-basic" 
                    label="Search Meal" 
                    variant="outlined" 
                    className="meal-search-bar"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} // Handle search query change
                />
            </div>

            {/* Meal List */}
            <div className="meal-list">
                <MealList searchQuery={searchQuery} /> {/* Pass searchQuery to MealList */}
            </div>

            <CreateMeal open={openDialog} onClose={handleCloseDialog} />
        </div>
    );
}

export default Meal;
