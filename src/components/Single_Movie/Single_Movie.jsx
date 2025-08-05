import React, { useEffect, useState } from "react";
import { IoIosStar } from "react-icons/io";
import { useParams } from "react-router-dom";

const Single_Movie = () => {
  const { id } = useParams(); // URL se movie ID nikalega
  const [movie, setMovie] = useState(null);
  const apiConfig = {
    baseUrl: "https://api.themoviedb.org/3/",
    apiKey: "086cfe05dd16828e37291d2f37293a38",
    originalImage: (imgPath) =>
      `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
  };

  useEffect(() => {
    if (id) {
      const fetchMovieDetails = async () => {
        try {
          const response = await fetch(
            `${apiConfig.baseUrl}movie/${id}?api_key=${apiConfig.apiKey}`
          );
          const data = await response.json();
          setMovie(data);
        } catch (error) {
          console.error("Error fetching movie details:", error);
        }
      };

      fetchMovieDetails();
    }
  }, []);

  return movie ? (
    <div
      className="bg-black text-white d-flex justify-content-between align-items-center w-100"
      style={{ gap: "80px", padding: "120px 80px 50px 80px", height: "100vh" }}
    >
      <img
        className="single-first"
        style={{ width: "300px", borderRadius: "12px" }}
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt="Error Image Not Found"
      />
      <div className="single-second">
        <h1 style={{ color: "white" }}>{movie.title}</h1>
        <p>{movie.overview}</p>
        <div style={{ lineHeight: "10px" }}>
          <p style={{ fontSize: "0.9rem" }}>
            <b>Release Date: </b> {movie.first_air_date}
          </p>
          <p style={{ fontSize: "0.9rem" }}>
            <b>Origin Country Name: </b> {movie.origin_country[0]}
          </p>
          <p
            style={{ fontSize: "0.9rem" }}
            className="d-flex justify-content-start align-items-center"
          >
            <b> Rating:</b>&nbsp; {movie.vote_average}&nbsp;
            <IoIosStar style={{ color: "#ffd63a" }} />
          </p>
          <p style={{ fontSize: "0.9rem" }}>
            {movie.popularity > 1000
              ? "One Of The Popular Movie "
              : "Not That Much Popular"}
          </p>
        </div>
      </div>
    </div>
  ) : (
    <p className="bg-black text-white w-100 d-flex justify-content-around align-items-center">
      Movie not found.
    </p>
  );
};

export default Single_Movie;
