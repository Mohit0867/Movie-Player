import React from "react";
import "./Footer.css";

import { Link } from "react-router";
import { FaGithub, FaInstagram, FaYoutube } from "react-icons/fa";
const Footer = () => {
  return (
    <div className="footer py-5">
      <div className="container text-center">
        <h3 className="mb-3 text-type">
          Unlimited Movies, <br /> Tv shows, and more.
        </h3>
        <p>Watch Anywhere Cancel Anytime</p>

        <div className="d-flex justify-content-center my-4 flex-wrap">
          <div
            className="d-flex align-items-center border border-danger rounded px-3 py-2 mx-2 mb-2  gap-3 justify-content-center"
            style={{ width: "180px" }}
          >
            <img
              src="netflix_logo2.png"
              alt="Apple Store"
              style={{ width: "30px" }}
            />
            <Link className="text-decoration-none" to="/">
              <p
                className="mb-0 small  d-flex justify-content-center align-items-center "
                style={{
                  fontWeight: "700",
                  color: "#ff0000",
                  fontSize: "1rem",
                  textWrap: "nowrap",
                }}
              >
                TRY IT NOW &gt;
              </p>
            </Link>
          </div>
        </div>

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center text-muted mt-5 pt-4 border-top border-white">
          <p className="mb-2 mb-md-0 text-white text-type">
            &copy; Developer Mohit{" "}
          </p>
          <div className="d-flex ">
            <Link
              className="px-3 text-white text-decoration-none d-flex justify-content-center align-items-center gap-1"
              to="https://github.com/mohit0867"
            >
              <FaGithub /> GitHub
            </Link>

            <Link
              className="px-3 text-white border-start border-white text-decoration-none  d-flex justify-content-center align-items-center gap-1"
              to="https://www.instagram.com/mohitRathore_33"
            >
              <FaInstagram /> Instagram
            </Link>
            <Link
              className="px-3 text-white border-start border-white text-decoration-none  d-flex justify-content-center align-items-center gap-1"
              to="https://www.youtube.com/"
            >
              <FaYoutube /> Youtube
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
