import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Grid, MenuItem, Alert
} from '@mui/material';
import axios from 'axios';

const UpdateMealDialog = ({ open, onClose, meal, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: '',
    ingredients: '',
    calories: '',
    sugar: '',
    fat: '',
    type: ''
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // Pre-fill form data when dialog opens with a meal
  useEffect(() => {
    if (meal) {
      setFormData({
        name: meal.name || '',
        ingredients: meal.ingredients || '',
        calories: meal.calories || '',
        sugar: meal.sugar || '',
        fat: meal.fat || '',
        type: meal.type || ''
      });
    }
  }, [meal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    for (const [key, value] of Object.entries(formData)) {
      if (!value) newErrors[key] = 'Required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async () => {
    if (!validateForm()) return;

    try {
      await axios.put(`/api/meals/${meal._id}`, formData);
      setSuccessMessage('Meal updated successfully!');
      onUpdate(); // Notify parent to refresh list
      setTimeout(() => {
        setSuccessMessage('');
        onClose(); // Close after showing message
      }, 1500);
    } catch (error) {
      console.error('Update failed:', error);
      setSuccessMessage('');
      setErrors({ ...errors, api: 'Update failed. Please try again.' });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Update Meal</DialogTitle>
      <DialogContent>
        {successMessage && <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>}
        {errors.api && <Alert severity="error" sx={{ mb: 2 }}>{errors.api}</Alert>}

        <TextField
          label="Meal Name" name="name" fullWidth variant="outlined" margin="dense"
          value={formData.name} onChange={handleChange}
          error={!!errors.name} helperText={errors.name}
        />

        <TextField
          label="Ingredients" name="ingredients" fullWidth variant="outlined" margin="dense"
          multiline rows={2} value={formData.ingredients} onChange={handleChange}
          error={!!errors.ingredients} helperText={errors.ingredients}
        />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Calories" name="calories" type="number" fullWidth margin="dense"
              value={formData.calories} onChange={handleChange}
              error={!!errors.calories} helperText={errors.calories}
              inputProps={{ min: 0 }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField select label="Sugar" name="sugar" fullWidth margin="dense"
              value={formData.sugar} onChange={handleChange}
              error={!!errors.sugar} helperText={errors.sugar}>
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="normal">Normal</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField select label="Fat" name="fat" fullWidth margin="dense"
              value={formData.fat} onChange={handleChange}
              error={!!errors.fat} helperText={errors.fat}>
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="normal">Normal</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField select label="Type" name="type" fullWidth margin="dense"
              value={formData.type} onChange={handleChange}
              error={!!errors.type} helperText={errors.type}>
              <MenuItem value="breakfast">Breakfast</MenuItem>
              <MenuItem value="lunch">Lunch</MenuItem>
              <MenuItem value="dinner">Dinner</MenuItem>
              <MenuItem value="snack">Snack</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleUpdate}>Update</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateMealDialog;
