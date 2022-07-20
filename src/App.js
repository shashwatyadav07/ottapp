import React from 'react';
import './App.css';
import Head from './Components/Head';
import NavBar from './Components/NavBar';
import { Routes, Route } from 'react-router-dom';
import Trending from './Pages/Trending';
import Movies from './Pages/Movies';
import TvSeries from './Pages/TvSeries';
import Search from './Pages/Search';
import IndividualMovie from './Pages/IndividualMovie';
import Home from './Pages/Home';
import HomeAdditional from './Pages/HomeAdditional';

function App() {

  return (
    <div className="App" >
      <Head />
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/homeadditional/:head" element={<HomeAdditional />} />
        <Route path='/trending' element={<Trending />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/tvseries" element={<TvSeries />} />
        <Route path="/search" element={<Search />} />
        <Route path="/individualmovie" element={<IndividualMovie />} />
      </Routes>
    </div>
  );
}

export default App;
