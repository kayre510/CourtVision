import React from "react";
import "./Hero.css";
import Steph from "../images/steph-curry.jpg";
import DameTime from "../images/dame-time.jpg";
function Hero() {
  return (
    <>
      <article>
        <img src={Steph} alt="background" className="img-fluid picture" />
        <div className="court-container">
          <h1
            className="h1 court"
            style={{ fontSize: "9vw", position: "absolute", top: "10%", left: "10%"  }}
          >
            COURT
            <h1
            className="h1 vision"
            style={{ fontSize: "9vw", position: "absolute", top: '150%', left: "180%" }}
          >
            VISION
          </h1>
          </h1>

        </div>

      </article>
    </>
  );
}

export default Hero;
