import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PlayerList() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/players')
      .then(response => setPlayers(response.data))
      .catch(error => console.error(error));
  }, []);
  console.log(players);

  return (
    <div>
      <h1>NBA Players</h1>
      <ul>
        {players.map(player => (
            <div key={player.Player}>
                <p>{player.Player}</p>
                <p>{player.Age}</p>
                <p>{player.Pos}</p>
                <p>{player.Tm}</p>
            </div>
        ))}
      </ul>
    </div>
  );
}

export default PlayerList;
