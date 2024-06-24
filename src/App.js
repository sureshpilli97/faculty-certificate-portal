import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar';
// import LogIn from './Components/LogIn';
import './App.css';

const App = () => {

  return (
    <Router>
      <div className='App'>
        <Routes>
          {/* <Route path='/login' element={<LogIn />} /> */}
          <Route path='/*' element={<NavBar />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
