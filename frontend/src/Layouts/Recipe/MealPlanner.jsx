import React, { useState } from 'react';
import './recipe.css';
import SearchBox from '../../Components/MealPlanner/searchBox.jsx';
import axios from 'axios';

const MealPlanner = () => {
  const [meals, setMeals] = useState([]);

const handleSearch = async (filters) => {
    try {
      const response = await axios.post('/api/meals/generate-plan', filters);
      setMeals(response.data.data);
    } catch (error) {
      console.error('Error generating meal plan:', error);
    }
  };
  

  return (
    <div className="right-content">
      <div className="recipe-header">
        <h1 className="meal-planner-title">Meal Planner</h1>
      </div>

      <SearchBox onSearch={handleSearch} />

      {/* <div style={{ margin: "30px" }}>
        {meals.length > 0 ? (
          <ul>
            {meals.map((meal) => (
              <li key={meal._id}>{meal.name}  {meal.calories} cal  {meal.sugar}  {meal.fat}  {meal.type}</li>
            ))}
          </ul>
        ) : (
          <p>No meals found.</p>
        )}
      </div> */}

      <div className="meal-results">
        {meals.map((meal) => (
          <div key={meal._id} className="meal-card">
            <h3>{meal.name}</h3>
            <p><strong>Calories:</strong> {meal.calories} cal</p>
            <p><strong>Sugar:</strong> {meal.sugar}</p>
            <p><strong>Fat:</strong> {meal.fat}</p>
            <p><strong>Type:</strong> {meal.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealPlanner;
