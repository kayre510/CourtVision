import React, { useEffect, useState } from "react";
import axios from "axios";
import "./OneVOne.css";
function OneVOne() {
  const [players, setPlayers] = useState([]);
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [stat_category, setStatCategory] = useState("");

  const categories = ["PTS", "REB", "AST"]
  const handlePlayer1Change = (event) => {
    setPlayer1(event.target.value);
  };

  const handlePlayer2Change = (event) => {
    setPlayer2(event.target.value);
  };

  const statCategoryChange = (event) => {
    let value = event.target.value;
    setStatCategory(value)
  };


  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/players")
      .then((response) => {
        setPlayers(response.data);
        console.log(response.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function getResults() {
    axios
      .get(`http://127.0.0.1:5000/compare-players?player1_name=${player1}&player2_name=${player2}&stat_category=${stat_category}`, {
        params: {
          player1: player1,
          player2: player2,
          stat_category: stat_category,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <div className="input-container">
        <select className="input-one" onChange={handlePlayer1Change}>
          {Object.values(players).map((player, index) => (
            <option key={index}>{player.name}</option>

          ))}
        </select>
       
        <select className="input-two" onChange={handlePlayer2Change}>
          {Object.values(players).map((player, index) => (
            <option key={index}>{player.name}</option>
          ))}
        </select>
      </div>
      <select onChange={statCategoryChange}>
        {categories.map((stat, index) => (
          <option>{stat}</option>
        ))}
      </select>
      <div className="face-off">
        <button className="face-off-button" onClick={getResults}>Face Off</button>
      </div>
    </>
  );
}

export default OneVOne;
