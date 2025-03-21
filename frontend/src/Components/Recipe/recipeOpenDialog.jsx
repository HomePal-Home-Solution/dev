import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

const RecipeOpenDialog = ({ open, onClose, recipe }) => {
    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="recipe-view-dialog" maxWidth="sm" fullWidth>
            <DialogTitle id="recipe-view-dialog" sx={{ fontWeight: 'bold', textAlign: 'center', fontSize: '1.6rem' }}>
                Recipe Details
            </DialogTitle>
            <DialogContent dividers>
                {recipe ? (
                    <Box sx={{ textAlign: 'center', p: 2 }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                            {recipe.name}
                        </Typography>

                        <Typography variant="body1" sx={{ color: 'gray', fontSize: '1rem', mb: 3 }}>
                            <strong>Ingredients:</strong> {recipe.ingredients || 'N/A'}
                        </Typography>

                        <Divider sx={{ mb: 3 }} />

                        <Box sx={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: 2,
                            textAlign: 'center',
                            fontSize: '1.1rem'
                        }}>
                            <Box>
                                <Typography variant="body1"><strong>Calories:</strong></Typography>
                                <Typography variant="h6">{recipe.calories}</Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1"><strong>Protein:</strong></Typography>
                                <Typography variant="h6">{recipe.protein}g</Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1"><strong>Carbs:</strong></Typography>
                                <Typography variant="h6">{recipe.carbs}g</Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1"><strong>Fat:</strong></Typography>
                                <Typography variant="h6">{recipe.fat}g</Typography>
                            </Box>
                        </Box>
                    </Box>
                ) : (
                    <Typography variant="body1" sx={{ textAlign: 'center', py: 3 }}>
                        No recipe selected.
                    </Typography>
                )}
            </DialogContent>

            <DialogActions sx={{ justifyContent: 'center', p: 2 }}>
                <Button onClick={onClose} variant="contained" color="primary" size="large">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default RecipeOpenDialog;
