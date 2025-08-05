import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

const Search = () => {
  const [search, setSearch] = useState([]);
  console.log(search);

  const { searchId } = useParams();
  const apiConfig = {
    baseUrl: "https://api.themoviedb.org/3/",
    apiKey: "086cfe05dd16828e37291d2f37293a38",
    originalImage: (imgPath) =>
      `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
  };

  const getSearch = async () => {
    try {
      const response = await fetch(
        ` ${apiConfig.baseUrl}search/movie?query=${searchId}&include_adult=false&language=en-US&page=1&api_key=${apiConfig.apiKey}`
      );
      const data = await response.json();
      console.log(data.results);
      setSearch(data.results);
    } catch (error) {
      console.error("Does not Exist", error);
    }
  };

  useEffect(() => {
    getSearch();
  }, []);
  return (
    <>
      <div
        style={{ paddingTop: "70px" }}
        className="row justify-content-center bg-black "
      >
        {search.map((search) => (
          <div
            key={search.id}
            className=" col-md-3 mb-4 d-flex justify-content-center"
          >
            <Link
              className="d-flex flex-column text-decoration-none align-items-center"
              to={`/movie-details/${search.id}`}
            >
              <img
                style={{
                  width: "100%",
                  maxWidth: "200px",
                  borderRadius: "5px",
                }}
                className="img-fluid shadow"
                src={`https://image.tmdb.org/t/p/original/${search.poster_path}`}
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
                <p className="text-light">{search.title}</p>
              </b>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Search;
