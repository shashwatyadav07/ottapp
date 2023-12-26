import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import IndividualMovie from './Pages/IndividualMovie';
import Home from './Pages/Home';

function App() {

  return (
    <div className="App" >
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/individualmovie" element={<IndividualMovie />} />
      </Routes>
    </div>
  );
}

export default App;
