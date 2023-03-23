import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import ball from '../images/basketball.jpeg'
export const NavBar = () => {
  return (
    <div>
      <nav>
        <div className="nav-bar-container">
        <img src={ball} alt="basketball-logo" className="basketball-logo"/>
          <ul style={{ listStyleType: "none" }}>
            <li>
              <NavLink className="players" to="/players" aria-current="page">
                Players
              </NavLink>
            </li>
            <li>
              <NavLink className="head-to-head" to="/1on1" aria-current="page">
                1 v 1
              </NavLink>
            </li>
            <li>
              <NavLink className="boxscore" to="/boxscore" aria-current="page">
                Boxscore
              </NavLink>
            </li>
            <li>
              <NavLink className="teams" to="/teams" aria-current="page">
                Teams
              </NavLink>
            </li>
            <li>
              <NavLink
                className="standings"
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