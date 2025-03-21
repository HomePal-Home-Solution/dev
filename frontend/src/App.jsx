import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import Dashboard from './Layouts/Dashboard';
import CreateShopping from './Components/shopping/CreateShopping';
import UpdateShopping from './Components/shopping/UpdateShopping';

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
            <Route path={'/'} exact={true} element={<Dashboard/>}/>
            <Route path={'/dashboard'} exact={true} element={<Dashboard/>}/>
            <Route path='/create-shopping' element={<CreateShopping/>}/>
            <Route path='/create-shopping/update/:id' element={<UpdateShopping/>}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
