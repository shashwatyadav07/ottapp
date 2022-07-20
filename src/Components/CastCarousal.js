import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import { img300 } from '../Configuration';
import NotAvailable from '../Images/NotAvailable.jpg';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

const CastCarousal = ({ media_type, id }) => {
    const [cast, setCast] = useState([]);
 
    const fetchCast = () => {
        fetch(`https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
            .then((resp) => {
                if (resp.status >= 200 && resp.status <= 299)
                    return resp.json();
                else {
                    throw new Error(resp.statusText);
                }
            })
            .then((castdata) => {
                setCast(castdata.cast);
            })
    }

    useEffect(() => {
        fetchCast();
    }, [])


    const handleDragStart = (e) => e.preventDefault();
    const items = cast.map(({ name, profile_path }) => {
        return <div className="actor">
            <img src={profile_path ? img300 + profile_path : NotAvailable} onDragStart={handleDragStart} role="presentation" />
            <p>{name}</p>
        </div>
    })

    const row_items = {
        0: {
            items: 3,
        },
        512: {
            items: 3,
        },
        1024: {
            items: 4,
        }
    }

    return (
        <div className="container cast">
            {/* autoPlay infinite disableButtonsControls disableDotsControls */}
            <AliceCarousel mouseTracking items={items} responsive={row_items} keyboardNavigation disableDotsControls
                renderPrevButton={() => {
                    return <span className="navigation" style={{ left: "-25px", }}>{<NavigateBeforeIcon style={{ fontSize: "2rem" }} />}</span>
                }}
                renderNextButton={() => {
                    return <span className="navigation" style={{ right: "-25px", }}>{<NavigateNextIcon style={{ fontSize: "2rem" }} />}</span>
                }}
            />
        </div>
    );
}

export default CastCarousal;