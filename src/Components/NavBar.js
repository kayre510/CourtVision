import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import logo from "../images/nbalogo.jpg"
import "./NavBar.css";

export const NavBar = () => {

  return (
    <>

      <Container>
        <Navbar bg="white" expand="lg" className="gap-3 px-3" fixed="top">
        <Navbar.Brand href="/"><img src={logo} placeholder="logo" className="img-fluid"/></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-center "
          >
            <Nav className="flex-grow-1 justify-content-evenly  nav-stick">
              <Nav.Link className="players link-item nav-link"  href="/players">
                Players
              </Nav.Link>
              <Nav.Link className="head-to-head link-item" href="/1on1">
                1 v 1
              </Nav.Link>
              <Nav.Link className="boxscore link-item" href="/boxscore">
                Box Score
              </Nav.Link>
              <Nav.Link className="teams link-item" href="/teams">
                Teams
              </Nav.Link>
              <Nav.Link
                className="league-standings link-item"
                href="/standings"
              >
                League Standings
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </>
  );
};
