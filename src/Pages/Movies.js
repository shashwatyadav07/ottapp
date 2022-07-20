import React, { useEffect, useState } from 'react';
import SingleMovie from '../Components/SingleMovie';
import PageNumber from '../Components/PageNumber';
import Genres from '../Components/Genres';
import {backimg} from '../Configuration';

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [genre, setGenre] = useState(28);

    const fetchData = () => {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genre}&with_watch_monetization_types=flatrate`)
            .then((resp) => {
                if (resp.status >= 200 && resp.status <= 299)
                    return resp.json();
                else {
                    throw new Error(resp.statusText);
                }

            })
            .then((data) => {
                setMovies(data.results);
                setTotalPages(data.total_pages);
            })
    }

    useEffect(() => {
        fetchData();
    }, [page, genre])
    

    return (
        <div className="movies" style={backimg}>
            <div className="container mx-auto row text-center">
                <h1>Movies</h1>
                <Genres setGenre={setGenre} setPage={setPage} dataType="movie" defaultGenre={genre} />
                {
                    movies.map(movie => <SingleMovie key={movie.id} {...movie} media_type="movie" />)
                }
            </div>
            {totalPages > 1 && <PageNumber pageno={page} setpage={setPage} totalPages={totalPages} />}
        </div>
    );
}

export default Movies;