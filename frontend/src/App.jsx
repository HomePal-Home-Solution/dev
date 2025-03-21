import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import Dashboard from './Layouts/Dashboard';
import ItemsDisplay from './Components/Item/ItemsDisplay';
import CreateItemForm from './Components/Item/CreateItemForm';
import ViewItemPage from './Components/Item/ViewItempage'; // Ensure the correct file name
import UpdateItem from './Components/Item/UpdateItems'; // Ensure the correct file name

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
            <Route path='/' exact element={<Dashboard />} />
            <Route path='/dashboard' exact element={<Dashboard />} />
            <Route path='/allitem' exact element={<ItemsDisplay />} />
            <Route path='/createitem' exact element={<CreateItemForm />} />
            <Route path='/item/:id' exact element={<ViewItemPage />} />
            <Route path='/updateitem/:id' exact element={<UpdateItem />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;