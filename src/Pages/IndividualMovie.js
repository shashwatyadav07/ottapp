import { Chip } from '@mui/material';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NotAvailable from '../Images/NotAvailable.jpg';
import { img500 } from '../Configuration';
import { backimg } from '../Configuration';
import AliceCarousel from 'react-alice-carousel';
import { img300 } from '../Configuration';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { Link } from 'react-router-dom';

const IndividualMovie = () => {
    const { state } = useLocation();
    const [id, setId] = useState(state.id);
    const [media_type, setMedia_type] = useState(state.media_type);
    const [data, setData] = useState();
    const [video1, setVideo1] = useState();
    const [video2, setVideo2] = useState();
    const [similar, setSimilar] = useState();
    const [recommended, setRecommended] = useState();
    const [cast, setCast] = useState([]);


    const fetchData = () => {
        fetch(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
            .then((resp) => {
                if (resp.status >= 200 && resp.status <= 299)
                    return resp.json();
                else {
                    throw new Error(resp.statusText);
                }
            })
            .then((data) => {
                setData(data);
            })
    }

    const fetchVideo = () => {
        fetch(`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
            .then((resp) => {
                if (resp.status >= 200 && resp.status <= 299)
                    return resp.json();
                else {
                    throw new Error(resp.statusText);
                }

            })
            .then((videodata) => {
                videodata.results.forEach(video => {
                    if (video.name.includes("Teaser"))
                        setVideo1(video?.key);
                    else if (video.name.includes("Trailer"))
                        setVideo2(video?.key);
                });
            })
    }

    const fetchSimilar = () => {
        fetch(`https://api.themoviedb.org/3/${media_type}/${id}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
            .then((resp) => {
                if (resp.status >= 200 && resp.status <= 299)
                    return resp.json();
                else {
                    throw new Error(resp.statusText);
                }
            })
            .then((data) => {
                setSimilar(data.results);
            })
    }

    const fetchRecommended = () => {
        fetch(`https://api.themoviedb.org/3/${media_type}/${id}/recommendations?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
            .then((resp) => {
                if (resp.status >= 200 && resp.status <= 299)
                    return resp.json();
                else {
                    throw new Error(resp.statusText);
                }
            })
            .then((data) => {
                setRecommended(data.results);
            })
    }

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
        window.scroll(0, 0);
        fetchData();
        fetchVideo();
        fetchSimilar();
        fetchRecommended();
        fetchCast();
    }, [id, media_type])

    const handleclick = (id, media_type) => {
        setId(id);
        setMedia_type(media_type);
    }

    const handleDragStart = (e) => e.preventDefault();
    const similaritems = similar && similar.map(({ id, name, title, poster_path }) => {
        return <div className="movie" onClick={() => handleclick(id, media_type)}>
            <img src={poster_path ? img300 + poster_path : NotAvailable} onDragStart={handleDragStart} alt="Not found" />
            <p>{name || title}</p>
        </div>
    })

    const recommendeditems = recommended && recommended.map(({ id, name, title, poster_path }) => {
        return <div className="movie" onClick={() => handleclick(id, media_type)}>
            <img src={poster_path ? img300 + poster_path : NotAvailable} onDragStart={handleDragStart} alt="Not found" />
            <p>{name || title}</p>
        </div>
    })

    const castitems = cast.map(({ name, profile_path }) => {
        return <div className="actor">
            <img src={profile_path ? img300 + profile_path : NotAvailable} onDragStart={handleDragStart} alt="not found" />
            <p>{name}</p>
        </div>
    })

    const cast_items = {
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

    const row_items = {
        0: {
            items: 3,
        },
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

    return (
        <>
            {
                data &&
                <div className="container-fluid" style={backimg}>
                    <div className="individualmovie mx-auto">
                        <div className="row mb-2">
                            <div className="col-11 col-sm-5 mx-auto" id="image-div">
                                <img src={data.poster_path ? img500 + data.poster_path : NotAvailable} alt="Not found" className="mainimg" />
                            </div>
                            <div className="col-11 col-sm-7 mx-auto" id="text-div">
                                <h1 className="mt-3">{data.name || data.title}</h1>
                                {
                                    data.genres.map(({ id, name }) => <Chip key={id} label={name} variant="outlined" size="small" style={{ margin: ".2em" }} className="chip" />)
                                }
                                <h5>{data.overview}</h5>
                                <h3>Cast :</h3>

                                <div className="container cast">
                                    <AliceCarousel mouseTracking items={castitems} responsive={cast_items} keyboardNavigation disableDotsControls
                                        renderPrevButton={() => {
                                            return <span className="navigation" style={{ left: "-25px", }}>{<NavigateBeforeIcon style={{ fontSize: "2rem" }} />}</span>
                                        }}
                                        renderNextButton={() => {
                                            return <span className="navigation" style={{ right: "-25px", }}>{<NavigateNextIcon style={{ fontSize: "2rem" }} />}</span>
                                        }}
                                    />
                                </div>

                            </div>
                        </div>
                        {video1 &&
                            <div>
                                <h3 className='heading3' style={{ marginBottom: "-.5rem" }}>Official Teaser</h3>
                                <iframe className="video mb-3" title={id} src={`https://www.youtube.com/embed/${video1}`}></iframe>
                            </div>
                        }
                        {video2 &&
                            <div>
                                <h3 className='heading3' style={{ marginBottom: "-.5rem" }}>Official Trailer</h3>
                                <iframe className="video mb-3" title={id} src={`https://www.youtube.com/embed/${video2}`}></iframe>
                            </div>
                        }

                        {
                            recommendeditems && <div className="home-div px-4 mx-auto">
                                <h3 className="heading3">Recommended Movies</h3>
                                <Link to="/homeadditional/Recommended Movies" state={{ url: `https://api.themoviedb.org/3/${media_type}/${id}/recommendations?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1` }}>
                                    <button className="btn btn-outline-primary see-more-btn">See More</button></Link>
                                <AliceCarousel mouseTracking items={recommendeditems} responsive={row_items} disableDotsControls
                                    animationType='fadeout'
                                    renderPrevButton={() => {
                                        return <span className="navigation" style={{ left: "-2rem" }}>{<NavigateBeforeIcon style={{ fontSize: "3rem" }} />}</span>
                                    }}
                                    renderNextButton={() => {
                                        return <span className="navigation" style={{ right: "-2.2rem" }}>{<NavigateNextIcon style={{ fontSize: "3rem" }} />}</span>
                                    }}
                                />
                            </div>
                        }

                        {
                            similaritems && <div className="home-div px-4 mx-auto">
                                <h3 className="heading3">Similar Movies</h3>
                                <Link to="/homeadditional/Similar Movies" state={{ url: `https://api.themoviedb.org/3/${media_type}/${id}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1` }}>
                                    <button className="btn btn-outline-primary see-more-btn">See More</button></Link>
                                <AliceCarousel mouseTracking items={similaritems} responsive={row_items} disableDotsControls
                                    animationType='fadeout'
                                    renderPrevButton={() => {
                                        return <span className="navigation" style={{ left: "-2rem" }}>{<NavigateBeforeIcon style={{ fontSize: "3rem" }} />}</span>
                                    }}
                                    renderNextButton={() => {
                                        return <span className="navigation" style={{ right: "-2.2rem" }}>{<NavigateNextIcon style={{ fontSize: "3rem" }} />}</span>
                                    }}
                                />
                            </div>
                        }

                        {/* <FetchData url={`https://api.themoviedb.org/3/${media_type}/${id}/recommendations?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`} head="Recommended Movies" /> */}
                        {/* <FetchData url={`https://api.themoviedb.org/3/${media_type}/${id}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`} head="Similar Movies" /> */}
                    </div>
                </div>
            }
        </>
    );
}

export default IndividualMovie;