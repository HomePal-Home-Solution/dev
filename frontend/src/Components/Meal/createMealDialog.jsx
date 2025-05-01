import * as React from 'react';
import './mealCompModule.css';
import {
  Dialog, DialogActions, DialogContent, DialogTitle,
  Button, TextField, Grid, Alert
} from '@mui/material';
import { MenuItem, Select, InputLabel, FormControl } from '@mui/material';


const CreateMeal = ({ open, onClose }) => {
  const [formData, setFormData] = React.useState({
    name: '',
    ingredients: '',
    calories: '',
    sugar: '',
    fat: '',
    type: ''
  });

  const [errors, setErrors] = React.useState({});
  const [successMessage, setSuccessMessage] = React.useState('');

  const nameRegex = /^[A-Za-z0-9\s]*$/;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if ((name === "name" || name === "ingredients") && !nameRegex.test(value)) {
      setErrors((prev) => ({ ...prev, [name]: "Symbols are not allowed" }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = 'This field is required';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (validateForm()) {
      try {
        // Submit to backend
        const response = await fetch('/api/meals', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        if (!response.ok) throw new Error('Failed to create meal');

        setSuccessMessage('Meal successfully created!');
        setTimeout(() => {
          setSuccessMessage('');
          onClose();
        }, 2000);
      } catch (error) {
        console.error('Error creating meal:', error);
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="create-meal-dialog">
      <DialogTitle id="create-meal-dialog">Create New Meal</DialogTitle>
      <DialogContent>
        {successMessage && <Alert severity="success">{successMessage}</Alert>}

        <TextField
          autoFocus
          margin="dense"
          label="Meal Name"
          fullWidth
          variant="outlined"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
        />

        <TextField
          margin="dense"
          label="Ingredients"
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          name="ingredients"
          value={formData.ingredients}
          onChange={handleChange}
          error={!!errors.ingredients}
          helperText={errors.ingredients}
        />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              margin="dense"
              label="Calories"
              type="number"
              fullWidth
              variant="outlined"
              name="calories"
              value={formData.calories}
              onChange={handleChange}
              error={!!errors.calories}
              helperText={errors.calories}
              inputProps={{ min: 0 }}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth margin="dense" error={!!errors.sugar}>
                <InputLabel id="sugar-label">Sugar</InputLabel>
                <Select
                    labelId="sugar-label"
                    name="sugar"
                    value={formData.sugar}
                    label="Sugar"
                    onChange={handleChange}
                >
                    <MenuItem value="low">Low</MenuItem>
                    <MenuItem value="normal">Normal</MenuItem>
                </Select>
                {errors.sugar && <p style={{ color: '#d32f2f', margin: '3px 14px 0 14px', fontSize: '0.75rem' }}>{errors.sugar}</p>}
            </FormControl>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControl fullWidth margin="dense" error={!!errors.fat}>
                <InputLabel id="fat-label">Fat</InputLabel>
                <Select
                    labelId="fat-label"
                    name="fat"
                    value={formData.fat}
                    label="Fat"
                    onChange={handleChange}
                >
                    <MenuItem value="low">Low</MenuItem>
                    <MenuItem value="normal">Normal</MenuItem>
                </Select>
                {errors.fat && <p style={{ color: '#d32f2f', margin: '3px 14px 0 14px', fontSize: '0.75rem' }}>{errors.fat}</p>}
            </FormControl>

          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth margin="dense" error={!!errors.type}>
                <InputLabel id="type-label">Type</InputLabel>
                <Select
                    labelId="type-label"
                    name="type"
                    value={formData.type}
                    label="Type"
                    onChange={handleChange}
                >
                    <MenuItem value="breakfast">Breakfast</MenuItem>
                    <MenuItem value="lunch">Lunch</MenuItem>
                    <MenuItem value="dinner">Dinner</MenuItem>
                    <MenuItem value="snack">Snack</MenuItem>
                </Select>
                {errors.type && (
                    <p style={{ color: '#d32f2f', margin: '3px 14px 0 14px', fontSize: '0.75rem' }}>
                    {errors.type}
                    </p>
                )}
                </FormControl>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions className="createMealBtnBox">
        <Button variant="outlined" onClick={onClose}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save Meal
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateMeal;
