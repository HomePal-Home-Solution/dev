import * as React from 'react';
import './recipeCompModule.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

const UpdateRecipe = ({ open, onClose, recipe }) => {
    const [formData, setFormData] = React.useState({
        name: recipe?.name || '',
        ingredients: recipe?.ingredients || '',
        calories: recipe?.calories || '',
        protein: recipe?.protein || '',
        carbs: recipe?.carbs || '',
        fats: recipe?.fat || '' // Fixed property name
    });

    const [errors, setErrors] = React.useState({});

    const nameRegex = /^[A-Za-z0-9\s]*$/;

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Restrict symbols for name and ingredients
        if ((name === "name" || name === "ingredients") && !nameRegex.test(value)) {
            setErrors((prev) => ({ ...prev, [name]: "Symbols are not allowed" }));
            return;
        }

        setFormData((prev) => ({ ...prev, [name]: value }));

        // Clear error when user starts typing correctly
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

    const handleUpdate = () => {
        if (validateForm()) {
            console.log("Updated Recipe:", formData);
            onClose(); // Close the dialog
        }
    };
    
    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="update-recipe-dialog">
            <DialogTitle id="update-recipe-dialog">Update Recipe</DialogTitle>
            <DialogContent>
                <TextField 
                    autoFocus 
                    margin="dense" 
                    label="Recipe Name" 
                    fullWidth 
                    variant="outlined" 
                    name="name"
                    defaultValue={recipe?.name} 
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
                    defaultValue={recipe?.ingredients}  
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
                            inputProps={{ min: 0 }}
                            onChange={handleChange}
                            error={!!errors.calories}
                            defaultValue={recipe?.calories} 
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField 
                            margin="dense" 
                            label="Proteins" 
                            type="number" 
                            fullWidth 
                            variant="outlined" 
                            inputProps={{ min: 0 }}
                            onChange={handleChange}
                            error={!!errors.protein}
                            defaultValue={recipe?.protein} // Corrected property name
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField 
                            margin="dense" 
                            label="Carbs" 
                            type="number" 
                            fullWidth 
                            variant="outlined" 
                            inputProps={{ min: 0 }}
                            onChange={handleChange}
                            error={!!errors.carbs}
                            defaultValue={recipe?.carbs} 
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField 
                            margin="dense" 
                            label="Fats" 
                            type="number" 
                            fullWidth 
                            variant="outlined" 
                            inputProps={{ min: 0 }}
                            onChange={handleChange}
                            error={!!errors.fats}
                            defaultValue={recipe?.fat} // Corrected property name 
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions className='createRecipeBtnBox'>
                <Button variant="outlined" onClick={onClose}>Cancel</Button>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleUpdate} 
                    disabled={!Object.values(formData).every(value => value !== '')}
                >
                    Update Recipe
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UpdateRecipe;