import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PlayerList() {
  const [players, setPlayers] = useState([]);
  const [player1, setPlayer1] = useState("");
  const [playerPhoto, setPlayerPhoto] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/players')
      .then(response => {
        const playersArray = Object.values(response.data);
        setPlayers(playersArray);
      })
      .catch(error => console.error(error));
  }, []);

  // useEffect(() => {
  //   axios
  //     .get("http://127.0.0.1:5000/players")
  //     .then((response) => {
  //       const playersWithPhoto = Object.values(response.data).map((player) => {
  //         let name = player.name;
  //         console.log(name)
  //         const photo = player.photo
  //           ? require(`../assets/${player.photo}`)
  //           : null;
  //         return { name, photo };
  //       });
  //       setPlayerPhoto(playersWithPhoto);
  //       console.log(playersWithPhoto)

  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  console.log(players);

  return (
    <div>
      <h1>NBA Players</h1>
      <ul>
        {Object.values(players).map(player => (
          <div key={player.id}>
            <p>{player.name}</p>
            {/* <img
              src={
                playerPhoto.map((player, index) => player.photo)
              }
              alt=''/> */}
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
