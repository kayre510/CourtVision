import React, { useState, useEffect } from "react";
import axios from "axios";

function PlayerList() {
  const [players, setPlayers] = useState([]);
  const [playerPhoto, setPlayerPhotos] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/players")
      .then((response) => {
        const playersArray = Object.values(response.data);
        setPlayers(playersArray);

        const playersWithPhoto = Object.values(response.data).map((player) => {
          let name = player.name;
          const photo = player.photo
            ? require(`../assets/${player.photo}`)
            : null;
          return { name, photo };
        });
        setPlayerPhotos(playersWithPhoto);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>NBA Players</h1>

      <table className="table">
        <thead>
          <tr>
            <th>Player</th>
            <th>Headshot</th>
            <th>Team</th>
            <th>Points</th>
            <th>Assists</th>
            <th>Rebounds</th>
            <th>Steals</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(players).map((player) => (
            <tr key={player.id}>
              <td>{player.name} </td>
              <td>
                {playerPhoto.map((photo, index) => (
                  player.name === photo.name ? (
                    <img key={index} src={photo.photo} alt="" />
                  ) : null
                ))}
              </td>
              <td>{player.team}</td>
              <td>{player.PTS}</td>
              <td>{player.AST}</td>
              <td>{player.REB}</td>
              <td>{player.STL}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

}

export default PlayerList;
