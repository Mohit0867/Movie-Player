import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Movies from "./components/Movies/Movies";
import Series from "./components/Series/Series";
import Footer from "./components/Footer/Footer";
import Single_Movie from "./components/Single_Movie/Single_Movie";
import Search from "./components/Search/Search";
import Tv from "./components/tv/tv";
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route>
          <Route path="/" element={<Home />} />
          <Route path="/Movies" element={<Movies />} />
          <Route path="/Series" element={<Series />} />
          <Route path="/movie-details/:id" element={<Single_Movie />} />
          <Route path="/Search/:searchId" element={<Search />} />
          <Route path="/tv-details/:id" element={<Tv />} />
          <Route path="/tv-details/${suggestion.id}" element={<Tv />} />
          <Route path="/movie-details/${item.id}" element={<Single_Movie />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
