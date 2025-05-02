import React, { useState } from 'react';
import './recipe.css';
import SearchBox from '../../Components/MealPlanner/searchBox.jsx';
import axios from 'axios';

const MealPlanner = () => {
  const [meals, setMeals] = useState([]);

  const handleSearch = async (filters) => {
    try {
      const response = await axios.get('/api/meals', { params: filters });
      setMeals(response.data.data); // ✅ Extract just the meals array
    } catch (error) {
      console.error('Error fetching meals:', error);
    }
  };

  return (
    <div className="right-content">
      <div className="recipe-header">
        <h1 className="meal-planner-title">Meal Planner</h1>
      </div>

      <SearchBox onSearch={handleSearch} />

      <div style={{ margin: "30px" }}>
        {meals.length > 0 ? (
          <ul>
            {meals.map((meal) => (
              <li key={meal._id}>{meal.name} - {meal.calories} cal</li>
            ))}
          </ul>
        ) : (
          <p>No meals found.</p>
        )}
      </div>
    </div>
  );
};

export default MealPlanner;
