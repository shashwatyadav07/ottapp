import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import PageNumber from '../Components/PageNumber';
import SingleMovie from '../Components/SingleMovie';
import { backimg } from '../Configuration';

const HomeAdditional = () => {
    const { head } = useParams();
    const { state: { url } } = useLocation();

    const [content, setContent] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState();

    const fetchData = () => {
        fetch(url.split("page=")[0] + `page=${page}`)
            .then((resp) => {
                if (resp.status >= 200 && resp.status <= 299)
                    return resp.json();
                else {
                    throw new Error(resp.statusText);
                }

            })
            .then((data) => {
                setContent(data.results);
                setTotalPages(data.total_pages);
            })
    }

    useEffect(() => {
        fetchData();
    }, [page])

    return (
        <div className="movies" style={backimg}>
            <div className="container mx-auto row text-center">
                <h1>{head}</h1>
                {
                    content.map(movie => <SingleMovie key={movie.id} {...movie} media_type="movie" />)
                }
            </div>
            {totalPages > 1 && <PageNumber pageno={page} setpage={setPage} totalPages={totalPages} />}
        </div>
    )
}

export default HomeAdditional;