import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography, Box, Divider
} from '@mui/material';

const MealOpenDialog = ({ open, onClose, meal }) => {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="meal-view-dialog" maxWidth="sm" fullWidth>
      <DialogTitle id="meal-view-dialog" sx={{ fontWeight: 'bold', textAlign: 'center', fontSize: '1.6rem' }}>
        Meal Details
      </DialogTitle>

      <DialogContent dividers>
        {meal ? (
          <Box sx={{ textAlign: 'center', p: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
              {meal.name}
            </Typography>

            <Typography variant="body1" sx={{ color: 'gray', fontSize: '1rem', mb: 3 }}>
              <strong>Ingredients:</strong> {meal.ingredients || 'N/A'}
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 2,
                textAlign: 'center',
                fontSize: '1.1rem'
              }}
            >
              <Box>
                <Typography variant="body1"><strong>Calories:</strong></Typography>
                <Typography variant="h6">{meal.calories}</Typography>
              </Box>
              <Box>
                <Typography variant="body1"><strong>Sugar:</strong></Typography>
                <Typography variant="h6">{meal.sugar}</Typography>
              </Box>
              <Box>
                <Typography variant="body1"><strong>Fat:</strong></Typography>
                <Typography variant="h6">{meal.fat}</Typography>
              </Box>
              <Box>
                <Typography variant="body1"><strong>Type:</strong></Typography>
                <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>{meal.type}</Typography>
              </Box>
            </Box>
          </Box>
        ) : (
          <Typography variant="body1" sx={{ textAlign: 'center', py: 3 }}>
            No meal selected.
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

export default MealOpenDialog;
