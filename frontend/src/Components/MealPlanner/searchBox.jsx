import * as React from 'react';
import './mealPlanner.css';
import {
  TextField, Button, Grid, Snackbar, Alert, MenuItem
} from '@mui/material';

const SearchBox = ({ onSearch }) => {

    const [formData, setFormData] = React.useState({
        type: [],
        calories: '',
        sugar: '',
        fat: ''
      });

  const [openError, setOpenError] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'type' ? typeof value === 'string' ? value.split(',') : value : value
    }));
  };
  

  const isAllEmpty = Object.values(formData).every(value => value === '');

  const handleSearch = () => {
    if (isAllEmpty) {
      setOpenError(true);
    } else {
      onSearch(formData);
    }
  };

  return (
    <div className="search-box">
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <TextField
            select
            SelectProps={{ multiple: true }}
            label="Meal Type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            fullWidth
            >
            <MenuItem value="breakfast">Breakfast</MenuItem>
            <MenuItem value="lunch">Lunch</MenuItem>
            <MenuItem value="dinner">Dinner</MenuItem>
            <MenuItem value="snack">Snack</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Calories (max)"
            name="calories"
            type="number"
            value={formData.calories}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            select
            label="Sugar"
            name="sugar"
            value={formData.sugar}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="normal">Normal</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={3}>
          <TextField
            select
            label="Fat"
            name="fat"
            value={formData.fat}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="normal">Normal</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" fullWidth onClick={handleSearch}>
            Search
          </Button>
        </Grid>
      </Grid>

      <Snackbar
        open={openError}
        autoHideDuration={3000}
        onClose={() => setOpenError(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity="error" onClose={() => setOpenError(false)}>
          Please fill at least one field before searching.
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SearchBox;
