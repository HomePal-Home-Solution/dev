import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import Dashboard from './Layouts/Dashboard';
import Recipe from './Layouts/Recipe/Recipe.jsx';
import MealPlanner from './Layouts/Recipe/MealPlanner.jsx';
import ItemsDisplay from './Components/Item/ItemsDisplay';
import CreateItemForm from './Components/Item/CreateItemForm';
import ViewItemPage from './Components/Item/ViewItempage'; // Ensure the correct file name
import UpdateItem from './Components/Item/UpdateItems';
import CreateShopping from './Components/Shopping/CreateShopping.jsx';
import UpdateShopping from './Components/Shopping/UpdateShopping.jsx';
import AddTaskForm from './Components/ToDoList/AddTaskForm.jsx';
import UpdateToDo from './Components/ToDoList/UpdateToDo.jsx';
import ToDoList from './Components/ToDoList/ToDoList.jsx';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className='main d-flex'>
        <div className='sidebarWrapper'>
          <Sidebar />
        </div>

        <div className='content'>
          <Routes>
            <Route path={'/'} exact={true} element={<Navigate to="dashboard"/>}/>
            <Route path={'/dashboard'} exact={true} element={<Dashboard/>}/>
            <Route path={'/recipe'} exact={true} element={<Recipe/>}/>
            <Route path={'/mealPlanner'} exact={true} element={<MealPlanner/>}/>
              
            <Route path='/allitem' exact element={<ItemsDisplay />} />
            <Route path='/createitem' exact element={<CreateItemForm />} />
            <Route path='/item/:id' exact element={<ViewItemPage />} />
            <Route path='/updateitem/:id' exact element={<UpdateItem />} />

            <Route path='/create-shopping' element={<CreateShopping/>}/>
            <Route path='/create-shopping/update/:id' element={<UpdateShopping/>}/>

            <Route path="/daily-tasks-form" element={<AddTaskForm />} />
            <Route path="/update-todolist/:taskId" element={<UpdateToDo />} />
            <Route path="/todolist" element={<ToDoList />} />

          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;