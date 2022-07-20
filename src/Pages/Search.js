import React, { useEffect, useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import SingleMovie from '../Components/SingleMovie';
import PageNumber from '../Components/PageNumber';

const Search = () => {
    const [value, setValue] = useState(0);
    const [text, setText] = useState('');
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState();

    const fetchData = () => {
        fetch(`https://api.themoviedb.org/3/search/${value ? "tv" : "movie"}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${text}&page=${page}&include_adult=false`)
            .then((resp) => {
                if (resp.status >= 200 && resp.status <= 299)
                    return resp.json();
                else {
                    throw new Error(resp.statusText);
                }
            })
            .then((data) => {
                setData(data.results);
                setTotalPages(data.total_pages);
            })
    }

    useEffect(() => {
        fetchData();
    }, [value, page, text])

    const handleChange = (event, newValue) => {
        console.log(newValue);
        setValue(newValue);
        setPage(1);
    };

    const handleTextField = (e) => {
        const val = e.target.value;
        setText(val);
    }

    return (
        <>
            <div className='container text-center search'>
                <input type="text" placeholder='Search' className='input-text' value={text} onChange={handleTextField} />
            </div>

            <div className="container mt-2">
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }} >
                    <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary" className="mx-auto" style={{ width: "50%" }}>
                        <Tab label="Movies" style={{ width: "50%", color: "#f2f8f9" }} />
                        <Tab label="Tv Series" style={{ width: "50%", color: "#f2f8f9" }} />
                    </Tabs>
                </Box>
            </div>

            <div className="container mx-auto row text-center mt-4">
                {
                    data.map(singledata => <SingleMovie key={singledata.id} {...singledata} media_type="movie" />)
                }
                {
                    text.length !== 0 && !data.length && (value ? <h1>No series found</h1> : <h1>No movies found</h1>)
                }
            </div>
            {totalPages > 1 && <PageNumber pageno={page} setpage={setPage} totalPages={totalPages} />}
        </>
    );
}

export default Search;