import * as React from 'react';
import './recipe.css';
import SearchBox from '../../Components/MealPlanner/searchBox.jsx';

const MealPlanner = () => {
    return (
        <div className="right-content">
            <div className="recipe-header">
                <h1 className="meal-planner-title">Meal Planner</h1>
            </div>
            {/* SearchBox Component */}
            <SearchBox />
        </div>
    );
};

export default MealPlanner;
