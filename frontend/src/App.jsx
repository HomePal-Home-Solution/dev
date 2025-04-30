import './App.css';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import Dashboard from './Layouts/Dashboard';
import Recipe from './Layouts/Recipe/Recipe.jsx';
import MealPlanner from './Layouts/Recipe/MealPlanner.jsx';
import ItemsDisplay from './Components/Item/ItemsDisplay';
import CreateItemForm from './Components/Item/CreateItemForm';
import ViewItemPage from './Components/Item/ViewItempage';
import UpdateItem from './Components/Item/UpdateItems';
import CreateShopping from './Components/Shopping/CreateShopping.jsx';
import UpdateShopping from './Components/Shopping/UpdateShopping.jsx';
import AddTaskForm from './Components/ToDoList/AddTaskForm.jsx';
import UpdateToDo from './Components/ToDoList/UpdateToDo.jsx';
import ToDoList from './Components/ToDoList/ToDoList.jsx';
import SignIn from './Layouts/SignIn.jsx';
import SignUp from './Layouts/SignUp.jsx';

function AppContent() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/signin" || location.pathname === "/signup";

  return (
    <>
      {!isAuthPage && <Header />} {/* Hide Header on SignIn & SignUp */}
      <div className='main d-flex'>
        {!isAuthPage && (
          <div className='sidebarWrapper'>
            <Sidebar />
          </div>
        )}

        <div className='content'>
          <Routes>
            <Route path="/" element={<Navigate to="/signin" />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/recipe" element={<Recipe />} />
            <Route path="/mealPlanner" element={<MealPlanner />} />
              
            <Route path="/allitem" element={<ItemsDisplay />} />
            <Route path="/createitem" element={<CreateItemForm />} />
            <Route path="/item/:id" element={<ViewItemPage />} />
            <Route path="/updateitem/:id" element={<UpdateItem />} />

            <Route path="/create-shopping" element={<CreateShopping />} />
            <Route path="/create-shopping/update/:id" element={<UpdateShopping />} />

            <Route path="/daily-tasks-form" element={<AddTaskForm />} />
            <Route path="/update-todolist/:taskId" element={<UpdateToDo />} />
            <Route path="/todolist" element={<ToDoList />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
