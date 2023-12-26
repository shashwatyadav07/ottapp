import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const IndividualMovie = () => {
  const { state } = useLocation();
  const [id, setId] = useState(state.id);
  const [media_type, setMedia_type] = useState(state.media_type);
  const [data, setData] = useState();
  const [video1, setVideo1] = useState();
  const [video2, setVideo2] = useState();

  const fetchData = () => {
    fetch(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    )
      .then((resp) => {
        if (resp.status >= 200 && resp.status <= 299) return resp.json();
        else {
          throw new Error(resp.statusText);
        }
      })
      .then((data) => {
        setData(data);
      });
  };

  const fetchVideo = () => {
    fetch(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    )
      .then((resp) => {
        if (resp.status >= 200 && resp.status <= 299) return resp.json();
        else {
          throw new Error(resp.statusText);
        }
      })
      .then((videodata) => {
        videodata.results.forEach((video) => {
          if (video.name.includes("Teaser")) setVideo1(video?.key);
          else if (video.name.includes("Trailer")) setVideo2(video?.key);
        });
      });
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchData();
    fetchVideo();
  }, [id, media_type]);


  return (
    <>
      {video1 && (
        <div>
          <h3 className="heading3" style={{ marginBottom: "-.5rem" }}>
            Official Teaser
          </h3>
          <iframe
            className="video mb-3"
            title={id}
            src={`https://www.youtube.com/embed/${video1}`}
          ></iframe>
        </div>
      )}
      {video2 && (
        <div>
          <h3 className="heading3" style={{ marginBottom: "-.5rem" }}>
            Official Trailer
          </h3>
          <iframe
            className="video mb-3"
            title={id}
            src={`https://www.youtube.com/embed/${video2}`}
          ></iframe>
        </div>
      )}
    </>
  );
};

export default IndividualMovie;
