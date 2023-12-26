import React from 'react';
import FetchData from '../Components/FetchData';

const Home = () => {

    return (
        <>
            <FetchData url={`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`} head="Upcoming Movies" />
            <FetchData url={`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_API_KEY}&page=1`} head="Trending Movies" />
           
            <FetchData url={`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`} head="Top Rated Movies" />
            
        </>
    );
}

export default Home;