import * as React from 'react';
import './recipeCompModule.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

const CreateRecipe = ({ open, onClose }) => {
    const [formData, setFormData] = React.useState({
        name: '',
        ingredients: '',
        calories: '',
        protein: '',
        carbs: '',
        fats: ''
    });

    const [errors, setErrors] = React.useState({});

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

    // Disable create button
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

    const handleSave = () => {
        if (validateForm()) {
            console.log("Recipe Created:", formData);
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="create-recipe-dialog">
            <DialogTitle id="create-recipe-dialog">Create New Recipe</DialogTitle>
            <DialogContent>
                <TextField 
                    autoFocus 
                    margin="dense" 
                    label="Recipe Name" 
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
                    rows={4} 
                    variant="outlined" 
                    name="ingredients"
                    value={formData.ingredients} 
                    onChange={handleChange}
                    error={!!errors.ingredients}
                    helperText={errors.ingredients}
                />

                {/* Row for Calories & Proteins */}
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
                        <TextField 
                            margin="dense" 
                            label="Proteins" 
                            type="number" 
                            fullWidth 
                            variant="outlined" 
                            name="protein"
                            value={formData.protein} 
                            onChange={handleChange}
                            error={!!errors.protein}
                            helperText={errors.protein}
                            inputProps={{ min: 0 }} 
                        />
                    </Grid>
                </Grid>

                {/* Row for Carbs & Fats */}
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField 
                            margin="dense" 
                            label="Carbs" 
                            type="number" 
                            fullWidth 
                            variant="outlined" 
                            name="carbs"
                            value={formData.carbs} 
                            onChange={handleChange}
                            error={!!errors.carbs}
                            helperText={errors.carbs}
                            inputProps={{ min: 0 }} 
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField 
                            margin="dense" 
                            label="Fats" 
                            type="number" 
                            fullWidth 
                            variant="outlined" 
                            name="fats"
                            value={formData.fats} 
                            onChange={handleChange}
                            error={!!errors.fats}
                            helperText={errors.fats}
                            inputProps={{ min: 0 }} 
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions className='createRecipeBtnBox'>
                <Button variant="outlined" onClick={onClose}>Cancel</Button>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleSave} 
                    disabled={!Object.values(formData).every(value => value !== '')}
                >
                    Save Recipe
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateRecipe;
