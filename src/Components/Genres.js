import React, { useEffect, useState } from 'react';
import { Chip } from '@mui/material';

const Genres = ({ setGenre, setPage, dataType, defaultGenre }) => {
    const [genres, setGenres] = useState([]);
    const fetchData = () => {
        fetch(`https://api.themoviedb.org/3/genre/${dataType}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
            .then((resp) => {
                if (resp.status >= 200 && resp.status <= 299)
                    return resp.json();
                else {
                    throw new Error(resp.statusText);
                }

            })
            .then((data) => {
                const newList = data.genres.map((genre) => {
                    if (genre.id !== defaultGenre)
                        return { ...genre, bgColor: "" };
                    return { ...genre, bgColor: "rgb(119, 115, 115)" };
                });
                setGenres(newList);
            })
    }

    useEffect(() => {
        fetchData();
    }, [])

    const handleClick = (id) => {
        const filterGenre = genres.map((genre) => {
            if (genre.id === id) {
                return { ...genre, bgColor: "rgb(119, 115, 115)" };
            }
            return { ...genre, bgColor: "" };
        });
        setGenres(filterGenre);
        setGenre(id);
        setPage(1);
    };

    return (
        <>
            <div className='container d-flex flex-wrap mb-3'>
                {
                    genres.map(({ id, name, bgColor }) => <Chip key={id} label={name} variant="outlined" onClick={() => handleClick(id)} className="chip" style={{ backgroundColor: bgColor }} size="small" />)
                }
            </div>
        </>
    );
}

export default Genres;