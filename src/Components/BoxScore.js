import React, { useEffect, useState } from "react";
import axios from "axios";
import GameGrid, { BoxscoreCard } from "./BoxscoreCard";

function Boxscore() {
  const [boxscore, setBoxscore] = useState([]);
  const [gameInfo, setGameInfo] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/boxscore")
      .then((response) => {
        setBoxscore(response.data);
        const games = [];
        for (const [key, value] of Object.entries(response.data)) {
          games.push([value]);
        }
        setGameInfo(games);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <BoxscoreCard gameInfo={gameInfo} />
    </div>
  );
}

export default Boxscore;
