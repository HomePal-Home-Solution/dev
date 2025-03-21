import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import Dashboard from './Layouts/Dashboard';
import Recipe from './Layouts/Recipe/Recipe.jsx';
import MealPlanner from './Layouts/Recipe/MealPlanner.jsx';

function App() {

  return (
    <BrowserRouter>
      <Header/>
      <div className='main d-flex'>
        <div className='sidebarWrapper'>
          <Sidebar/>
        </div>

        <div className='content'>
          <Routes>
            <Route path={'/'} exact={true} element={<Navigate to="dashboard"/>}/>
            <Route path={'/dashboard'} exact={true} element={<Dashboard/>}/>
            <Route path={'/recipe'} exact={true} element={<Recipe/>}/>
            <Route path={'/mealPlanner'} exact={true} element={<MealPlanner/>}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
