import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import ball from "../images/nbalogo.jpg";
export const NavBar = () => {
  return (
    <div>
      <nav>
        <div className="nav-bar-container">
          <div className="logo-container">
            <img src={ball} alt="basketball-logo" className="basketball-logo" />
          </div>
          <ul style={{ listStyleType: "none" }}>
            <li>
              <NavLink
                className="players link-item"
                to="/players"
                aria-current="page"
              >
                Players
              </NavLink>
            </li>
            <li>
              <NavLink
                className="head-to-head link-item"
                to="/1on1"
                aria-current="page"
              >
                1 v 1
              </NavLink>
            </li>
            <li>
              <NavLink
                className="boxscore link-item"
                to="/boxscore"
                aria-current="page"
              >
                Boxscore
              </NavLink>
            </li>
            <li>
              <NavLink
                className="teams link-item"
                to="/teams"
                aria-current="page"
              >
                Teams
              </NavLink>
            </li>
            <li>
              <NavLink
                className="league-standings link-item"
                to="/standings"
                aria-current="page"
              >
                Standings
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};
