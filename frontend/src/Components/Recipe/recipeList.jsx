import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FilterListIcon from '@mui/icons-material/FilterList';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import UpdateRecipeDialog from './UpdateRecipeDialog'; // Import the dialog component
import RecipeOpenDialog from './recipeOpenDialog'

function createData(id, name, ingredients, calories, fat, carbs, protein) {
  return { id, name, ingredients, calories, fat, carbs, protein };
}

const rows = [
    createData(1, 'Cupcake', 'ingredients 1', 305, 3.7, 67, 4.3),
    createData(2, 'Donut', 'ingredients 2', 452, 25.0, 51, 4.9),
    createData(3, 'Eclair', 'ingredients 3', 262, 16.0, 24, 6.0),
    createData(4, 'Frozen yoghurt', 'ingredients 3', 159, 6.0, 24, 4.0),
    createData(5, 'Gingerbread', 'ingredients 3', 356, 16.0, 49, 3.9),
    createData(6, 'Honeycomb', 'ingredients 3', 408, 3.2, 87, 6.5),
    createData(7, 'Ice cream sandwich', 'ingredients 3', 237, 9.0, 37, 4.3),
    createData(8, 'Jelly Bean', 'ingredients 3', 375, 0.0, 94, 0.0),
    createData(9, 'KitKat', 'ingredients 3', 518, 26.0, 65, 7.0),
    createData(10, 'Lollipop', 'ingredients 3', 392, 0.2, 98, 0.0),
    createData(11, 'Marshmallow', 'ingredients 3', 318, 0, 81, 2.0),
    createData(12, 'Nougat', 'ingredients 3', 360, 19.0, 9, 37.0),
    createData(13, 'Oreo', 'ingredients 3', 437, 18.0, 63, 4.0),
];

export default function EnhancedTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedRecipe, setSelectedRecipe] = React.useState(null);
  const [openViewDialog, setOpenViewDialog] = React.useState(false);
  const [selectedRecipeForView, setSelectedRecipeForView] = React.useState(null);


  const handleEditClick = (recipe) => {
    setSelectedRecipe(recipe);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRecipe(null);
  };

  const handleViewClick = (recipe) => {
    setSelectedRecipeForView(recipe);
    setOpenViewDialog(true);
};

const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    setSelectedRecipeForView(null);
};


  const visibleRows = React.useMemo(
    () =>
      [...rows]
        .sort((a, b) =>
          order === 'desc' ? (b[orderBy] - a[orderBy]) : (a[orderBy] - b[orderBy])
        )
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage]
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Toolbar>
          <Typography sx={{ flex: '1 1 100%', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '10px' }}>
            Recipes List
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
                <TableCell sx={{fontSize: '1.3rem'}}>Recipe Name</TableCell>
                <TableCell sx={{fontSize: '1.3rem'}} align="right">Calories</TableCell>
                <TableCell sx={{fontSize: '1.3rem'}} align="right">Fat (g)</TableCell>
                <TableCell sx={{fontSize: '1.3rem'}} align="right">Carbs (g)</TableCell>
                <TableCell sx={{fontSize: '1.3rem'}} align="right">Protein (g)</TableCell>
                <TableCell sx={{fontSize: '1.3rem'}} align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell  scope="row" sx={{fontSize: '1.02rem'}}>{row.name}</TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleViewClick(row)}>
                        <VisibilityIcon />
                    </IconButton>
                    <IconButton onClick={() => handleEditClick(row)}>
                      <DriveFileRenameOutlineIcon />
                    </IconButton>
                    <IconButton><DeleteForeverIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
        />
      </Paper>

      {/* Update Recipe Dialog */}
      <UpdateRecipeDialog open={openDialog} onClose={handleCloseDialog} recipe={selectedRecipe} />
      <RecipeOpenDialog open={openViewDialog} onClose={handleCloseViewDialog} recipe={selectedRecipeForView} />

    </Box>
  );
}
