import React from 'react';
import MainCarousel from '../Components/MainCarousel';
import FetchData from '../Components/FetchData';

const Home = () => {

    return (
        <>
            <MainCarousel />
            <FetchData url={`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`} head="Upcoming Movies" />
            <FetchData url={`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_API_KEY}&page=1`} head="Trending Movies" />
            <FetchData url={`https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.REACT_APP_API_KEY}&page=1`} head="Trending TV" />
            <FetchData url={`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`} head="Top Rated Movies" />
            <FetchData url={`https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`} head="Top Rated TV" />
        </>
    );
}

export default Home;