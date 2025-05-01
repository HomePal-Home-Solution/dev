import * as React from 'react';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead,
  TablePagination, TableRow, Toolbar, Typography, Paper, IconButton, Tooltip
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import axios from 'axios';

export default function MealList() {
  const [meals, setMeals] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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

      {/* Dialogs */}
      {/* <UpdateMealDialog open={openDialog} onClose={() => setOpenDialog(false)} meal={selectedMeal} />
      <MealOpenDialog open={openViewDialog} onClose={() => setOpenViewDialog(false)} meal={selectedMealForView} /> */}
    </Box>
  );
}
