import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PlayerList() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/players')
      .then(response => {
        const playersArray = Object.values(response.data);
        setPlayers(playersArray);
      })
      .catch(error => console.error(error));
  }, []);

  console.log(players);

  return (
    <div>
      <h1>NBA Players</h1>
      <ul>
        {Object.values(players).map(player => (
          <div key={player.id}>
            <p>{player.name}</p>
            <img src={player.photo} alt={player.name} />
            <p>{player.PTS}</p>
            <p>{player.AST}</p>
            <p>{player.REB}</p>
            <p>{player.STL}</p>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default PlayerList;
