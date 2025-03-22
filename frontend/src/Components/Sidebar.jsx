import * as React from 'react';
import List from '@mui/material/List';
import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CategoryIcon from '@mui/icons-material/Category';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FlatwareIcon from '@mui/icons-material/Flatware';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import EggIcon from '@mui/icons-material/Egg';

const Sidebar = () => {
    const [openSections, setOpenSections] = React.useState({
        items: false,
        shopping: false,
        mealPlanner: false,
        toDoList: false
    });

    const handleClick = (section) => {
        setOpenSections((prev) => ({
            ...prev,
            [section]: !prev[section] // Toggle only the clicked section
        }));
    };

    return (
        <div className='sidebar'>
            <List sx={{ width: '100%', maxWidth: 360 }} component="nav">
                
                <ListItemButton to="/dashboard">
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItemButton>

                {/* Item Management */}
                <ListItemButton onClick={() => handleClick("items")}>
                    <ListItemIcon>
                        <CategoryIcon />
                    </ListItemIcon>
                    <ListItemText primary="Items" />
                    {openSections.items ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openSections.items} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                    <Link to="/allitem" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <EggIcon />
                            </ListItemIcon>
                            <ListItemText primary="View Items" />
                        </ListItemButton>
                    </Link>
                    <Link to="/createitem" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <RestaurantIcon />
                            </ListItemIcon>
                            <ListItemText primary="Create Item" />
                        </ListItemButton>
                        </Link>
                    </List>
                </Collapse>

                {/* Shopping Management */}
                <ListItemButton onClick={() => handleClick("shopping")}>
                    <ListItemIcon>
                        <CategoryIcon />
                    </ListItemIcon>
                    <ListItemText primary="Shopping" />
                    {openSections.shopping ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openSections.shopping} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                    <Link to="/create-shopping" style={{ textDecoration: 'none' , color: 'inherit'}}>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <EggIcon />
                            </ListItemIcon>
                            <ListItemText primary="Shopping List" />
                        </ListItemButton>
                    </Link>
                        {/* <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <RestaurantIcon />
                            </ListItemIcon>
                            <ListItemText primary="Management" />
                        </ListItemButton> */}
                    </List>
                </Collapse>

                {/* Recipe Management */}
                <ListItemButton onClick={() => handleClick("mealPlanner")}>
                    <ListItemIcon>
                        <FlatwareIcon />
                    </ListItemIcon>
                    <ListItemText primary="Meal Planner" />
                    {openSections.mealPlanner ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openSections.mealPlanner} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <Link to="/recipe" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <MenuBookIcon />
                                </ListItemIcon>
                                <ListItemText primary="Recipes" />
                            </ListItemButton>
                        </Link>
                        
                        <Link to="/mealPlanner" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <RestaurantIcon />
                                </ListItemIcon>
                                <ListItemText primary="Meal Planner" />
                            </ListItemButton>
                        </Link>
                    </List>
                </Collapse>

                {/* Time Management */}
                <ListItemButton onClick={() => handleClick("toDoList")}>
                    <ListItemIcon>
                        <CategoryIcon />
                    </ListItemIcon>
                    <ListItemText primary="To-Do List" />
                    {openSections.toDoList ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openSections.toDoList} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <EggIcon />
                            </ListItemIcon>
                            <ListItemText primary="Ingredients" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <RestaurantIcon />
                            </ListItemIcon>
                            <ListItemText primary="Management" />
                        </ListItemButton>
                    </List>
                </Collapse>

            </List>
        </div>
    );
}

export default Sidebar;