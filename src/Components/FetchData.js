import React, { useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel';
import { img300 } from '../Configuration';
import NotAvailable from '../Images/NotAvailable.jpg';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { Link } from 'react-router-dom';

const FetchData = ({ url, head }) => {
    const [data, setData] = useState([]);

    const fetchData = () => {
        fetch(url)
            .then((resp) => {
                if (resp.status >= 200 && resp.status <= 299)
                    return resp.json();
                else {
                    throw new Error(resp.statusText);
                }
            })
            .then((data) => {
                setData(data.results);
            })
    }

    useEffect(() => {
        fetchData();
    }, [])

    const row_items = {
        0: {
            items: 3,
        },
        // 422: {
        //     items: 4,
        // },
        600: {
            items: 5,
        },
        800: {
            items: 6,
        },
        1024: {
            items: 7.5,
        }
    }

    const handleDragStart = (e) => e.preventDefault();
    const items = data.map(({ id, name, title, poster_path }) => {
        return <Link style={{ textDecoration: 'none' }} to={`/individualmovie`} state={{ id, media_type: head.includes("Movies") ? "movie" : "tv" }}>
            <div className="movie">
                <img src={poster_path ? img300 + poster_path : NotAvailable} onDragStart={handleDragStart} alt="Not found" />
                <p>{name || title}</p>
            </div>
        </Link>
    })

    return (
        data.length !== 0 && <div className="home-div px-4 mx-auto">
            <h3 className="heading3">{head}</h3>
            <Link to={`/homeadditional/${head}`} state={{ url }}><button className="btn btn-outline-primary see-more-btn">See More</button></Link>
            <AliceCarousel mouseTracking items={items} responsive={row_items} disableDotsControls
                animationType='fadeout'
                renderPrevButton={() => {
                    return <span className="navigation" style={{ left: "-2rem" }}>{<NavigateBeforeIcon style={{ fontSize: "3rem" }} />}</span>
                }}
                renderNextButton={() => {
                    return <span className="navigation" style={{ right: "-2.2rem" }}>{<NavigateNextIcon style={{ fontSize: "3rem" }} />}</span>
                }}
            />
        </div>
    )
}

export default FetchData;