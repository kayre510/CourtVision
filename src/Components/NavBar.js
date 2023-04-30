import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import "./NavBar.css";
import ball from "../images/nbalogo.jpg";
export const NavBar = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  return (
    <>

    <Container>

      <Navbar bg="white" expand="lg">

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
          <Nav className="mr-auto justify-content-center nav-bar-container">
            <Nav.Link className="players link-item nav-link mr-4" href="/players">
              Players
            </Nav.Link>
            <Nav.Link className="head-to-head link-item mr-4" href="/1on1">
              1 v 1
            </Nav.Link>
            <Nav.Link className="boxscore link-item mr-4" href="/boxscore">
              Box Score
            </Nav.Link>
            <Nav.Link className="teams link-item mr-4" href="/teams">
              Teams
            </Nav.Link>
            <Nav.Link className="league-standings link-item mr-4" href="/standings">
              League Standings
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      </Container>
    </>
  );
};




{
  /* <nav className="navbar navbar-expand-lg navbar-light justify-content-center">
        <div className="nav-bar-container">
        <button
      class="navbar-toggler"
      type="button"
      data-mdb-toggle="collapse"
      data-mdb-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded={!isNavCollapsed ? true: false}
      aria-label="Toggle navigation"
      onClick={handleNavCollapse}
    >
 <span class="navbar-toggler-icon"></span>
    </button>

     <div class={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarSupportedContent"> */
}
{
  /* <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <ul
              className="navbar-nav"
              style={{ listStyleType: "none" }}
            >
              <li className="nav-item">
                <NavLink
                  className="players link-item nav-link"
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
            </Navbar.Collapse>
          </div> */
}

// </div>
