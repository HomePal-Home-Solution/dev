import * as React from 'react';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead,
  TablePagination, TableRow, Toolbar, Typography, Paper, IconButton, Tooltip
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MealOpenDialog from './mealOpenDialog';
import axios from 'axios';
import UpdateMealDialog from './updateMealDialog';

export default function MealList() {
  const [meals, setMeals] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openViewDialog, setOpenViewDialog] = React.useState(false);
  const [selectedMeal, setSelectedMeal] = React.useState(null);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);

  React.useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      const res = await axios.get('/api/meals');
      setMeals(res.data.data);
    } catch (err) {
      console.error('Failed to fetch meals:', err.message);
    }
  };

  const handleEditClick = (meal) => {
    setSelectedMeal(meal);
    setOpenEditDialog(true);
  };
  const handleViewClick = (meal) => {
    setSelectedMeal(meal);
    setOpenViewDialog(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this meal?')) return;
  
    try {
      await axios.delete(`/api/meals/${id}`);
      setMeals((prevMeals) => prevMeals.filter((meal) => meal._id !== id));
    } catch (error) {
      console.error('Failed to delete meal:', error.message);
    }
  };


  const visibleRows = React.useMemo(
    () => meals.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [meals, page, rowsPerPage]
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Toolbar>
          <Typography sx={{ flex: '1 1 100%', fontSize: '1.5rem', fontWeight: 'bold' }}>
            Meals List
          </Typography>
          <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
        <TableContainer>
          <Table sx={{ minWidth: 750 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: '1.2rem' }}>Name</TableCell>
                <TableCell sx={{ fontSize: '1.2rem' }} align="right">Calories</TableCell>
                <TableCell sx={{ fontSize: '1.2rem' }} align="center">Sugar</TableCell>
                <TableCell sx={{ fontSize: '1.2rem' }} align="center">Fat</TableCell>
                <TableCell sx={{ fontSize: '1.2rem' }} align="center">Type</TableCell>
                <TableCell sx={{ fontSize: '1.2rem' }} align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows.map((row) => (
                <TableRow key={row._id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="center">{row.sugar}</TableCell>
                  <TableCell align="center">{row.fat}</TableCell>
                  <TableCell align="center">{row.type}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleViewClick(row)}>
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton onClick={() => handleEditClick(row)}>
                      <DriveFileRenameOutlineIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(row._id)}>
                      <DeleteForeverIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25]}
          component="div"
          count={meals.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
        />
      </Paper>

      <MealOpenDialog
        open={openViewDialog}
        onClose={() => setOpenViewDialog(false)}
        meal={selectedMeal}
      />

      <UpdateMealDialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        meal={selectedMeal}
        onUpdate={fetchMeals}
      />
    </Box>
  );
}
