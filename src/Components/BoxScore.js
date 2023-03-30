import React, { useEffect, useState } from "react";
import axios from "axios";
function Boxscore() {
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
{playerPhoto.map((photo, index) => (
        <img key={index} src={photo.photo} alt="" />
      ))}
    </div>
  );
}
export default Boxscore;
