import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PlayerSelection() {
  const [players, setPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://api-nba-v1.p.rapidapi.com/players',
      params: { team: '1', season: '2021' },
      headers: {
        'X-RapidAPI-Key': 'dc784801fbmsh42606aedf91e42dp1545c4jsn9eb925e07d10',
        'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
      }
    };

    axios.request(options)
      .then(response => {
        console.log(response)
        const playerData = response.data.response;
        console.log(response)

        const playerNames = playerData.map(player => {
          return {
            id: player.playerid,
            name: player.firstname + ' ' + player.lastname,
            team: player.teamName
          };
        });
        console.log(playerNames)
        setPlayers(playerNames);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  function handleSelectPlayer(event) {
    const playerId = event.target.value;
    const selectedPlayer = players.find(player => player.id === playerId);
    setSelectedPlayers([...selectedPlayers, selectedPlayer]);
  }


  return (
    <div>
      <h2>Select Players</h2>
      <select onChange={handleSelectPlayer}>
        <option value="">--Select a Player--</option>
        {players.map(player => (
          <option key={player.id} value={player.id}>{player.name} ({player.team})</option>
        ))}
      </select>
      <h3>Selected Players:</h3>
      <ul>
        {selectedPlayers.map(player => (
          <li key={player.id}>{player.name} ({player.team})</li>
        ))}
      </ul>
    </div>
  );
}

export default PlayerSelection;
