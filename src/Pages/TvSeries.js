import React, { useEffect, useState } from 'react';
import Genres from '../Components/Genres';
import PageNumber from '../Components/PageNumber';
import SingleMovie from '../Components/SingleMovie';
import {backimg} from '../Configuration';

const TvSeries = () => {

    const [series, setSeries] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [genre, setGenre] = useState(10759);

    const fetchData = () => {
        fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genre}&with_watch_monetization_types=flatrate`)
            .then((resp) => {
                if (resp.status >= 200 && resp.status <= 299)
                    return resp.json();
                else {
                    throw new Error(resp.statusText);
                }
            })
            .then((data) => {
                setSeries(data.results);
                setTotalPages(data.total_pages);
            })
    }

    useEffect(() => {
        fetchData();
    }, [page, genre])

    return (
        <div className='tvseries' style={backimg}>
            <div className="container mx-auto row text-center">
                <h1>TV Series</h1>
                <Genres setGenre={setGenre} setPage={setPage} dataType="tv" defaultGenre={genre} />
                {
                    series.map(movie => <SingleMovie key={movie.id} {...movie} media_type="tv" />)
                }
            </div>
            {totalPages > 1 && <PageNumber pageno={page} setpage={setPage} totalPages={totalPages} />}
        </div>
    );
}

export default TvSeries;