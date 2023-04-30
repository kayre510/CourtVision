import React from "react";
import "./Hero.css";
import Steph from "../images/steph-curry.jpg";
import DameTime from "../images/dame-time.jpg";
function Hero() {
  return (
    <>

        <img src={Steph} alt="background" className="img-fluid picture"/>
        <h1 className="h1 header">COURT <br/> VISION</h1>
     
    </>
  );
}

export default Hero;
