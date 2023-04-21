import React from 'react';
import {BrowserRouter, Routes as Switch, Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Home from './pages/Home';
import AddEdit from './pages/AddEdit';
import View from './pages/View';
import About from './pages/About';
import Header from './components/Header';


function App() {
  return (
  
    <BrowserRouter>
      <div className='App'>
        <Header/>
        <ToastContainer position='top-center' />
        <Switch>
          <Route exact path='/' Component={Home} />
          <Route  path='/add' Component={AddEdit} />
          <Route  path='/update/:id' Component={AddEdit} />
          <Route  path='/view/:id' Component={View} />
          <Route  path='/about' Component={About} />
        </Switch>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
