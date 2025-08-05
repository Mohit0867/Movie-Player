import React, { useEffect, useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { MdCreateNewFolder, MdOutlineFilterList } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import { PiListStarBold } from "react-icons/pi";
import { IoLanguage, IoTv } from "react-icons/io5";
import { ImDownload2 } from "react-icons/im";
import { TbBrandYoutubeKids } from "react-icons/tb";
import { FaArrowTrendUp, FaRegBell, FaUserAstronaut } from "react-icons/fa6";
import { RiSettings3Line } from "react-icons/ri";

const Home = () => {
  const [trailers, setTrailers] = useState([
    {
      id: 1,
      title: "first",
      url: "https://www.youtube.com/embed/YShVEXb7-ic?si=mREzVlepxZxwdkUx",
    },
    {
      id: 2,
      title: "second",
      url: "https://www.youtube.com/embed/xRWYNpg5YRA?si=lJ92eTKbVgonBwv-",
    },
  ]);
  const [randomTrailer, setRandomTrailer] = useState(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * trailers.length);
    setRandomTrailer(trailers[randomIndex]);
  }, [trailers]);

  const [movie, setMovie] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [trending, setTrending] = useState([]);
  const apiConfig = {
    baseUrl: "https://api.themoviedb.org/3/",
    apiKey: "086cfe05dd16828e37291d2f37293a38",
    originalImage: (imgPath) =>
      `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
  };
  const getPopularTrendingShows = async () => {
    try {
      const response = await fetch(
        `${apiConfig.baseUrl}movie/top_rated?language=en-US&page=1&api_key=${apiConfig.apiKey}`
      );
      const data = await response.json();
      console.log(data.results);
      const shuffledData = data.results.sort(() => 0.5 - Math.random());
      setMovie(shuffledData);
    } catch (error) {
      console.error("Error fetching popular TV shows:", error);
    }
  };
  useEffect(() => {
    getPopularTrendingShows();
  }, []);
  const getPopularSuggestions = async () => {
    try {
      const response = await fetch(
        ` ${apiConfig.baseUrl}tv/airing_today?language=en-US&page=1&api_key=${apiConfig.apiKey}`
      );
      const data = await response.json();
      // console.log(data.results);
      const shuffledData = data.results.sort(() => 0.5 - Math.random());
      setSuggestions(shuffledData);
    } catch (error) {
      console.error("Error fetching popular TV shows:", error);
    }
  };

  useEffect(() => {
    getPopularSuggestions();
  }, []);
  const getTrendingMovies = async () => {
    try {
      const response = await fetch(
        `${apiConfig.baseUrl}trending/all/day?language=en-US&page=1&api_key=${apiConfig.apiKey}`
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
    getTrendingMovies();
  }, []);
  return (
    <>
      <div className="d-flex ">
        <div className="">
          <div
            style={{
              paddingTop: "50px",
            }}
          >
            {randomTrailer && (
              <div className="video-size" style={{ height: "90vh" }}>
                <iframe
                  width="100%"
                  height="100%"
                  src={randomTrailer.url}
                  title={randomTrailer.title}
                  frameBorder="0"
                  allow=" "
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>

          <div className="w-100 bg-black text-light" style={{ height: "auto" }}>
            <div
              style={{
                paddingTop: "50px",
                paddingInline: "-20px",
                width: "100%",
              }}
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
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "start",
                      }}
                    >
                      {movie.title.length > 18
                        ? `${movie.title.slice(0, 18)}...`
                        : movie.title}

                      <span style={{ fontSize: "10px" }}>
                        Date: {movie.release_date}
                      </span>
                      <span style={{ fontSize: "10px" }}>
                        Popularity: {movie.popularity}
                      </span>
                    </b>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* 2nd container */}
          <div className="w-100 " style={{ objectFit: "contain" }}>
            <img
              src="movies-one.jpg"
              className="w-100 h-100"
              style={{ objectFit: "contain" }}
              alt="Movie"
            />
          </div>

          <div className="w-100 bg-black text-light" style={{ height: "auto" }}>
            <div
              style={{
                paddingTop: "20px",
                paddingInline: "-20px",
                width: "100%",
              }}
              className="row justify-content-center bg-black "
            >
              {trending.map((trending) => (
                <div
                  key={trending.id}
                  className=" col-md-4 mb-4 d-flex justify-content-center "
                  style={{ paddingInline: "40px" }}
                >
                  <Link
                    className="d-flex flex-column text-decoration-none align-items-center"
                    to={`/movie-details/${trending.id}`}
                  >
                    <img
                      style={{
                        objectFit: "cover",
                        objectPosition: "top",
                        width: "350px",
                        height: "180px",
                        borderRadius: "5px",
                      }}
                      className="img-fluid shadow"
                      src={`https://image.tmdb.org/t/p/original/${trending.poster_path}`}
                      alt=""
                    />
                    <div
                      style={{
                        color: "#fff",
                        marginTop: "10px",
                        textAlign: "center",
                        fontSize: "1.3rem ",
                        textWrap: "wrap",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "start",
                        width: "100%",
                      }}
                    >
                      {" "}
                      <b className="">
                        {trending.name ? `${trending.name}  ` : ""}
                        {trending.title}
                      </b>
                      <p
                        style={{
                          fontSize: "10px",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <span>Date:{trending.release_date}</span>
                        <span>Popularity: {trending.vote_average}</span>
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="w-100 " style={{ objectFit: "contain" }}>
            <img
              src="movies-six.png"
              className="w-100 h-100"
              style={{ objectFit: "contain" }}
              alt="Movie"
            />
          </div>

          <div className="w-100 bg-black text-light" style={{ height: "auto" }}>
            <div
              style={{
                paddingTop: "20px",
                paddingInline: "-20px",
                width: "100%",
              }}
              className="row justify-content-center bg-black "
            >
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  className=" col-md-3  mb-4 d-flex justify-content-center "
                  style={{ paddingInline: "0px" }}
                >
                  <Link
                    className="d-flex flex-column text-decoration-none align-items-center"
                    to={`/tv-details/${suggestion.id}`}
                  >
                    <img
                      style={{
                        objectFit: "cover",
                        objectPosition: "top",
                        width: "100%",
                        maxWidth: "200px",
                        borderRadius: "5px",
                      }}
                      className="img-fluid shadow"
                      src={`https://image.tmdb.org/t/p/original/${suggestion.poster_path}`}
                      alt=""
                    />
                    <div
                      style={{
                        color: "#fff",
                        marginTop: "10px",
                        textAlign: "center",
                        fontSize: "1.3rem ",
                        textWrap: "wrap",
                        display: "flex",
                        justifyContent: "start",
                        flexDirection: "column",
                        alignItems: "start",
                        width: "100%",
                      }}
                    >
                      <b className=" ">
                        {suggestion.name.length > 17
                          ? `${suggestion.name.slice(0, 17)}...`
                          : suggestion.name}
                      </b>
                      <p
                        style={{
                          fontSize: "10px",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <span>Date: {suggestion.first_air_date}</span>
                        <span>Popularity: {suggestion.vote_average}</span>
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
