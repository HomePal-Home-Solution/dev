import * as React from 'react';
import './mealPlanner.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const SearchBox = () => {
    const [formData, setFormData] = React.useState({
        calories: '',
        fat: '',
        carbs: '',
        proteins: ''
    });

    const [openError, setOpenError] = React.useState(false); // Snackbar state

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Check if all fields are empty
    const isAllEmpty = Object.values(formData).every(value => value === '');

    const handleSearch = () => {
        if (isAllEmpty) {
            setOpenError(true);
        } else {
            console.log("Searching with:", formData);
            // Implement search logic here
        }
    };

    return (
        <div className="search-box">
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={2.4}>
                    <TextField 
                        label="Calories" 
                        variant="outlined" 
                        fullWidth
                        type="number" 
                        name="calories"
                        value={formData.calories}
                        onChange={handleChange}
                        inputProps={{ min: 0 }} 
                    />
                </Grid>
                <Grid item xs={2.4}>
                    <TextField 
                        label="Fat" 
                        variant="outlined" 
                        fullWidth
                        type="number" 
                        name="fat"
                        value={formData.fat}
                        onChange={handleChange}
                        inputProps={{ min: 0 }} 
                    />
                </Grid>
                <Grid item xs={2.4}>
                    <TextField 
                        label="Carbs" 
                        variant="outlined" 
                        fullWidth 
                        type="number" 
                        name="carbs"
                        value={formData.carbs}
                        onChange={handleChange}
                        inputProps={{ min: 0 }} 
                    />
                </Grid>
                <Grid item xs={2.4}>
                    <TextField 
                        label="Proteins" 
                        variant="outlined" 
                        fullWidth 
                        type="number" 
                        name="proteins"
                        value={formData.proteins}
                        onChange={handleChange}
                        inputProps={{ min: 0 }} 
                    />
                </Grid>
                <Grid item xs={2.4} className="search-btn-container">
                    <Button 
                        variant="contained" 
                        color="primary" 
                        fullWidth
                        onClick={handleSearch}
                    >
                        Search
                    </Button>
                </Grid>
            </Grid>

            {/* Error Snackbar - Positioned Top-Right */}
            <Snackbar 
                open={openError} 
                autoHideDuration={3000} 
                onClose={() => setOpenError(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert severity="error" onClose={() => setOpenError(false)}>
                    Please enter at least one value before searching!
                </Alert>
            </Snackbar>
        </div>
    );
};

export default SearchBox;
