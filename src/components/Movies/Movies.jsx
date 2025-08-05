import React, { useEffect, useState } from "react";

import "./Movies.css";
import { Link } from "react-router";
const Movies = () => {
  const [movie, setMovie] = useState([]);
  const [trending, setTrending] = useState([]);
  const [topMovie, setTopMovie] = useState([]);

  const apiConfig = {
    baseUrl: "https://api.themoviedb.org/3/",
    apiKey: "086cfe05dd16828e37291d2f37293a38",
    originalImage: (imgPath) =>
      `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
  };
  //Suggestions
  const getPopularTVShows = async () => {
    try {
      const response = await fetch(
        ` ${apiConfig.baseUrl}movie/popular?api_key=${apiConfig.apiKey}`
      );
      const data = await response.json();
      console.log(data.results); // Array of popular TV shows
      const shuffledData = data.results.sort(() => 0.5 - Math.random());
      setMovie(shuffledData);
      //setMovie(data.results);
    } catch (error) {
      console.error("Error fetching popular TV shows:", error);
    }
  };

  useEffect(() => {
    getPopularTVShows();
  }, []);

  // 2nd trending

  const getPopularTrendingShows = async () => {
    try {
      const response = await fetch(
        ` ${apiConfig.baseUrl}tv/popular?api_key=${apiConfig.apiKey}`
      );
      const data = await response.json();
      console.log(data.results);
      const shuffledData = data.results.sort(() => 0.5 - Math.random());
      setTrending(shuffledData);
    } catch (error) {
      console.error("Error fetching popular TV shows:", error);
    }
  };

  useEffect(() => {
    getPopularTrendingShows();
  }, []);

  const getTopShows = async () => {
    try {
      const response = await fetch(
        `${apiConfig.baseUrl}movie/top_rated?language=en-US&page=1&api_key=${apiConfig.apiKey}`
      );
      const data = await response.json();
      console.log(data.results);
      const shuffledData = data.results.sort(() => 0.5 - Math.random());
      setTopMovie(shuffledData);
    } catch (error) {
      console.error("Error fetching popular TV shows:", error);
    }
  };

  useEffect(() => {
    getTopShows();
  }, []);

  return (
    <>
      <div
        className="w-100 "
        style={{ objectFit: "contain", padding: "60px 0px 0px 0px" }}
      >
        <img
          src="movies-four.png"
          className="w-100 h-100"
          style={{ objectFit: "contain" }}
          alt="Movie"
        />
      </div>

      <div
        style={{ padding: "60px 30px 30px 30px" }}
        className="row justify-content-center bg-black "
      >
        {movie.map((movie) => (
          <div
            key={movie.id}
            className=" col-md-3 mb-4 d-flex justify-content-center"
          >
            <Link
              className="d-flex flex-column text-decoration-none align-items-center"
              to={`/movie-details/${movie.id}`}
            >
              <img
                style={{
                  width: "100%",
                  maxWidth: "200px",
                  borderRadius: "5px",
                }}
                className="img-fluid shadow"
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt=""
              />
              <b
                style={{
                  color: "#fff",
                  marginTop: "10px",
                  textAlign: "center",
                  fontSize: "1.3rem ",
                  textWrap: "wrap",
                }}
              >
                {movie.title}
              </b>
            </Link>
          </div>
        ))}
      </div>

      <div>
        <p
          className="w-100 fs-4 text-type"
          style={{
            color: " white",
            backgroundColor: "black",
            marginBottom: "0px",
          }}
        >
          Suggestions:
        </p>
        <div
          className=" bg-black text-white w-100 d-flex justify-content-around align-items-center "
          style={{
            height: "auto",
            overflowX: "scroll",
            scrollbarWidth: "none",
          }}
        >
          {movie && movie.length > 0 ? (
            movie.slice(0, 20).map((item, index) => (
              <div
                className=" d-flex flex-column justify-content-center align-items-center"
                key={index}
              >
                {" "}
                <Link
                  className="d-flex flex-column text-decoration-none align-items-center"
                  to={`/movie-details/${item.id}`}
                >
                  <img
                    style={{ width: "170px" }}
                    src={apiConfig.w500Image(item.poster_path)}
                    alt="error"
                  />
                  <p className="text-light">{movie.title}</p>
                </Link>
              </div>
            ))
          ) : (
            <p
              className="d-flex justify-content-center align-items-center "
              style={{ color: " #80afb3", backgroundColor: "black" }}
            >
              Loading or no data found...
              <div className="loader "></div>
            </p>
          )}
        </div>
      </div>

      {/* 2nd */}

      <div>
        <p
          className="w-100 fs-4 text-type"
          style={{
            color: " white",
            backgroundColor: "black",

            marginBottom: "0px",
          }}
        >
          Trending:
        </p>
        <div
          className=" bg-black text-white w-100 d-flex justify-content-around align-items-center "
          style={{
            height: "auto",
            overflowX: "scroll",
            scrollbarWidth: "none",
          }}
        >
          {trending && trending.length > 0 ? (
            trending.slice(0, 20).map((item, index) => (
              <div
                className=" d-flex flex-column justify-content-center align-items-center"
                key={index}
              >
                <Link
                  className="d-flex flex-column text-decoration-none align-items-center"
                  to={`/tv-details/${item.id}`}
                >
                  <img
                    style={{ width: "170px" }}
                    src={apiConfig.w500Image(item.poster_path)}
                    alt="error"
                  />
                  <p className="text-light">{trending.title}</p>
                </Link>
              </div>
            ))
          ) : (
            <p
              className="d-flex justify-content-center align-items-center"
              style={{ color: " white", backgroundColor: "#3b3b3b" }}
            >
              Loading or no data found...
              <div className="loader "></div>
            </p>
          )}
        </div>
      </div>

      {/* 3rd */}

      <div>
        <p
          className="w-100 fs-4 text-type"
          style={{
            color: " white",
            backgroundColor: "black",

            marginBottom: "0px",
          }}
        >
          Top Movies:
        </p>
        <div
          className=" bg-black text-white w-100 d-flex justify-content-around align-items-center "
          style={{
            height: "auto",
            overflowX: "scroll",
            scrollbarWidth: "none",
          }}
        >
          {topMovie && topMovie.length > 0 ? (
            topMovie.slice(0, 20).map((item, index) => (
              <div
                className=" d-flex flex-column justify-content-center align-items-center"
                key={index}
              >
                {" "}
                <Link
                  className="d-flex flex-column text-decoration-none align-items-center"
                  to={`/movie-details/${item.id}`}
                >
                  <img
                    style={{ width: "170px" }}
                    src={apiConfig.w500Image(item.poster_path)}
                    alt="error"
                  />
                  <p className="text-light">{topMovie.title}</p>
                </Link>{" "}
              </div>
            ))
          ) : (
            <p
              className="d-flex justify-content-center align-items-center"
              style={{ color: " #80afb3", backgroundColor: "black" }}
            >
              Loading or no data found...
              <div className="loader "></div>
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Movies;
