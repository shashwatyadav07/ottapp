import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { img300, img500 } from '../Configuration';
import NotAvailable from '../Images/NotAvailable.jpg';

const MainCarousel = () => {
    const [nowPlaying, setNowPlaying] = useState([]);

    const fetchnowPlaying = () => {
        fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
            .then((resp) => {
                if (resp.status >= 200 && resp.status <= 299)
                    return resp.json();
                else {
                    throw new Error(resp.statusText);
                }
            })
            .then((data) => {
                setNowPlaying(data.results);
            })
    }

    useEffect(() => {
        fetchnowPlaying();
    }, [])

    const demo = (image) => {
        const backimg = {
            backgroundImage: `url(${image})`,
            backgroundRepeat: "no-repeat",
            // backgroundAttachment:"fixed",
            backgroundSize: "100% auto",
            backgroundPosition: "0 13%",
            zIndex: 10,
        };
        return backimg;
    }

    return (
        <div id="carouselExampleFade" className="carousel slide carousel-fade mb-4" data-bs-ride="carousel">
            <div className="carousel-inner">
                {
                    nowPlaying.map(({ id, name, title, poster_path, overview, release_date }, ind) => {
                        return (
                            <div className={ind === 0 ? "carousel-item active" : "carousel-item"} key={id}>
                                {/* <img src={poster_path ? img500 + poster_path : NotAvailable} className="d-block main-img" alt="Not found" /> */}
                                <div className="d-block main-img" style={demo(poster_path ? img500 + poster_path : "")}></div>
                                <Link to={`/individualmovie`} state={{ id, media_type: "movie" }}>
                                    <div className="card mb-3 mx-auto main-card text-portion">
                                        <div className="row g-0">
                                            <div className="col-md-4">
                                                <img src={poster_path ? img300 + poster_path : NotAvailable} className="img-fluid rounded-start" alt="Not found" />
                                            </div>

                                            <div className="col-md-8 ">
                                                <div className="card-body text-div">
                                                    <h2 className="card-title">{name || title}</h2>
                                                    <p className="card-text overview">{overview.length > 270 ? overview.substr(0, 420) + "..." : overview}</p>
                                                    <strong><em><p className="card-text" style={{ marginTop: "-.7rem" }}><u>Realease Date</u> : {release_date}</p></em></strong>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        );
                    })
                }

            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}

export default MainCarousel