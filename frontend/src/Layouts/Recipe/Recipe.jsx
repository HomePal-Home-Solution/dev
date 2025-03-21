import * as React from 'react';
import './recipe.css';
import RecipeList from '../../Components/Recipe/recipeList.jsx';
import CreateRecipe from '../../Components/Recipe/createRecipeDiolog.jsx';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const Recipe = () => {
    const [openDialog, setOpenDialog] = React.useState(false);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <div className="right-content">
            {/* Header Section */}
            <div className="recipe-header">
                <h1 className="recipe-title">Recipes Management</h1>
            </div>

            {/* Action Bar (Button & Search) */}
            <div className="recipe-actions">
                <Button variant="contained" color="primary" className="add-recipe-btn" onClick={handleOpenDialog}>
                    Add Recipe
                </Button>
                <TextField 
                    id="outlined-basic" 
                    label="Search Recipes" 
                    variant="outlined" 
                    className="search-bar"
                />
            </div>

            {/* Recipe List */}
            <div className="recipe-list">
                <RecipeList />
            </div>

            {/* Create Recipe Dialog */}
            <CreateRecipe open={openDialog} onClose={handleCloseDialog} />
        </div>
    );
};

export default Recipe;
