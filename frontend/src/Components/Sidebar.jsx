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
import MenuBookIcon from '@mui/icons-material/MenuBook';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import EggIcon from '@mui/icons-material/Egg';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddIcon from '@mui/icons-material/Add';
import PostAddIcon from '@mui/icons-material/PostAdd';
import EventNoteIcon from '@mui/icons-material/EventNote';

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
            [section]: !prev[section]
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
                                <PostAddIcon />
                            </ListItemIcon>
                            <ListItemText primary="View Items" />
                        </ListItemButton>
                    </Link>
                    <Link to="/createitem" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <AddIcon />
                            </ListItemIcon>
                            <ListItemText primary="Create Item" />
                        </ListItemButton>
                        </Link>
                    </List>
                </Collapse>

                {/* Shopping Management */}
                <ListItemButton onClick={() => handleClick("shopping")}>
                    <ListItemIcon>
                        <ShoppingCartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Shopping" />
                    {openSections.shopping ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openSections.shopping} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                    <Link to="/create-shopping" style={{ textDecoration: 'none' , color: 'inherit'}}>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <ShoppingCartCheckoutIcon />
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
                        <FoodBankIcon />
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
                        <EventNoteIcon />
                    </ListItemIcon>
                    <ListItemText primary="To-Do List" />
                    {openSections.toDoList ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openSections.toDoList} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <Link to="/todolist" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <PostAddIcon />
                                </ListItemIcon>
                                <ListItemText primary="Tasks List" />
                            </ListItemButton>
                        </Link>
                    </List>
                </Collapse>

            </List>
        </div>
    );
}

export default Sidebar;