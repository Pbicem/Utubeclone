import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import "./Header.css";

function Header(props: any) {
  const [searchInput, setInput] = useState("");

  function handleSubmit(e: any) {
    var buttn: any = document.querySelector<HTMLElement>(".searchButton");
    buttn.click();

    console.log("YES ENTERED");
    return <h1> can we Render </h1>;
  }

  return (
    <div className="heading">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
      <div className="heading-left">
        <i className="fa fa-bars"></i>
        <h4 className="utubeTitle">Youtube</h4>
      </div>
      <div className="heading-middle">
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="inputbox"
            onChange={(e) => {
              setInput(e.target.value);
            }}
            value={searchInput}
          ></input>

          <button className="searchbuttonouter">
            <Link
              type="submit"
              className="searchButton"
              to={`/search/${searchInput}`}
            >
              <i className="fa fa-search"></i>
            </Link>
          </button>
        </form>
      </div>
      <div className="heading-right">
        <h4> </h4>
      </div>
    </div>
  );
}

export default Header;
