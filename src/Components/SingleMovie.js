import React from 'react';
import { Link } from 'react-router-dom';
import { img300 } from '../Configuration';
import NotAvailable from '../Images/NotAvailable.jpg';
import Badge from '@mui/material/Badge';


const SingleMovie = ({ id, poster_path, title, name, media_type, vote_average }) => {

    const badgeValue = (rating) => {
        if (rating <= 7)
            return "primary";
        else if (rating > 7 && rating < 8)
            return "secondary";
        else if (rating >= 8)
            return "success";
    }
    const header = (title || name);
    return (
        <div className="col-12 col-md-6 col-lg-4 mb-4 ">
            <div className="card h-100 p-2 bg-dark singlemovie-card">
                <Badge badgeContent={vote_average.toFixed(1) == 0.0 ? "NA" : vote_average.toFixed(1)} color={badgeValue(vote_average.toFixed(1))} />
                <Link to={`/individualmovie`} state={{ id, media_type }}><img src={poster_path ? img300 + poster_path : NotAvailable} className="card-img-top" alt="Not found" /></Link>
                <div className="container p-0 mt-2 text-center">
                    <h5 className="card-title">{header}</h5>
                </div>
            </div>
        </div>
    );
}

export default SingleMovie;