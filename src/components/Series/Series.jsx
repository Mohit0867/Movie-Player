import React, { useEffect, useState } from "react";
import "./Series.css";
import { Link } from "react-router-dom";

const Series = () => {
  const [series, setSeries] = useState([]);

  const apiConfig = {
    baseUrl: "https://api.themoviedb.org/3/",
    apiKey: "086cfe05dd16828e37291d2f37293a38",
    originalImage: (imgPath) =>
      `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
  };

  const getPopularTVShows = async () => {
    try {
      const response = await fetch(
        `${apiConfig.baseUrl}tv/popular?api_key=${apiConfig.apiKey}`
      );
      const data = await response.json();
      const shuffledData = data.results.sort(() => 0.5 - Math.random());
      setSeries(shuffledData);
    } catch (error) {
      console.error("Error fetching popular TV shows:", error);
    }
  };

  useEffect(() => {
    getPopularTVShows();
  }, []);

  return (
    <>
      <div
        className="w-100"
        style={{ objectFit: "contain", paddingTop: "60px" }}
      >
        <img
          src="movies-six.png"
          className="w-100 h-100"
          style={{ objectFit: "contain" }}
          alt="Movie"
        />
      </div>

      <div className="row w-100 bg-black text-white p-3">
        {series && series.length > 0 ? (
          series.slice(0, 20).map((item) => (
            <div
              className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center"
              key={item.id}
            >
              <Link
                className="d-flex flex-column text-decoration-none align-items-center"
                to={`/tv-details/${item.id}`}
              >
                <img
                  style={{ width: "150px", borderRadius: "8px" }}
                  src={apiConfig.w500Image(item.poster_path)}
                  alt={item.name}
                />
                <div style={{ marginTop: "10px", textAlign: "center" }}>
                  <b style={{ fontSize: "1.2rem", color: "#fff" }}>
                    {item.name.length > 20
                      ? item.name.slice(0, 20) + "..."
                      : item.name}
                  </b>
                  <p
                    style={{
                      fontSize: "0.8rem",
                      color: "#80afb3",
                      marginTop: "5px",
                    }}
                  >
                    {item.overview
                      ? item.overview.slice(0, 35) + "..."
                      : "Doesn't have description"}
                  </p>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p
            className="d-flex justify-content-center align-items-center w-100"
            style={{
              color: "#80afb3",
              backgroundColor: "black",
              height: "100px",
            }}
          >
            Loading or no data found... <div className="loader ms-2"></div>
          </p>
        )}
      </div>
    </>
  );
};

export default Series;
