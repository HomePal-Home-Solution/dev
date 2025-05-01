import * as React from 'react';
import './meal.css';
import MealList from '../../Components/Meal/mealList.jsx';

const Meal = () => {
    return (
        <div className="right-content">
            {/* Header Section */}
            <div className="meal-header">
                <h1 className="meal-title">Meals Management</h1>
            </div>

            {/* Meal List */}
            <div className="meal-list">
                <MealList />
            </div>
        </div>
    );
}

export default Meal;