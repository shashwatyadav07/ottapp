import React, { useState, useEffect } from 'react';
import SingleMovie from '../Components/SingleMovie';
import PageNumber from '../Components/PageNumber';
import {backimg} from '../Configuration';

const Trending = () => {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);

    const fetchData = () => {

        fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`)
            .then((resp) => {
                if (resp.status >= 200 && resp.status <= 299)
                    return resp.json();
                else {
                    throw new Error(resp.statusText);
                }
            })
            .then((data) => {
                setMovies(data.results);
            })
    }

    useEffect(() => {
        fetchData();
    }, [page]);

    return (
        <>
            <div className="container-fluid" style={backimg}>
            <div className='container mx-auto row text-center trending'>
                <h1>Trending</h1>
                {
                    movies.map(movie => <SingleMovie key={movie.id} {...movie} />)
                }
            </div>

            <PageNumber pageno={page} setpage={setPage} />
            </div>
        </>
    );
}

export default Trending;