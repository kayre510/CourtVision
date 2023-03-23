import React, { useEffect, useState } from "react";
import axios from "axios";
function OneVOne() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/players")
      .then((response) => {
        console.log(response.data);
        setPlayers(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <select>
        {players.map((player, index) => (

            <option key={index}>{player.Player}</option>

        ))}
      </select>
    </div>
  );
}

export default OneVOne;
