import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./OneVOne.css";
import { ResultModal } from "./ResultModal";
import { Dropdown } from "./Dropdown";
import * as NBAIcons from "react-nba-logos";

function OneVOne() {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [stat_category, setStatCategory] = useState("PTS");
  const [playerPhoto, setPlayerPhoto] = useState([]);
  const [resultModal, setResultModal] = useState(false);
  const [result, setResult] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const searchRef = useRef();
  const categories = ["PTS", "REB", "AST"];

  const statCategoryChange = (event) => {
    let value = event.target.value;
    setStatCategory(value);
  };

  useEffect(() => {
    setSearchValue("");
    if (searchRef.current) {
      searchRef.current.focus();
    }
  }, []);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/players")
      .then((response) => {
        const playersWithPhoto = Object.values(response.data).map((player) => {
          let name = player.name;
          let team = player.team;

          const photo = player.photo
            ? require(`../assets/${player.photo}`)
            : null;
          return { team, name, photo };
        });
        setPlayerPhoto(playersWithPhoto);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function getResults() {
    axios
      .get(
        `http://127.0.0.1:5000/compare-players?player1_name=${player1}&player2_name=${player2}&stat_category=${stat_category}`,
        {
          params: {
            player1: player1,
            player2: player2,
            stat_category: stat_category,
          },
        }
      )
      .then((response) => {
        const results = response.data.result;
        setResult(results);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // console.log(NBAIcons[playerPhoto.find((player, index) => player.name === player1 )?.team?.toUpperCase()])
  function TeamLogo({ team }) {
    const TeamIcon = NBAIcons[team.toUpperCase()];
    return <TeamIcon size={500}/>;
  }

  return (
    <div className="parent-container">
      <div className="input-container">
        <div className="input-one">
          {/* <input
            type="text"
            value={handlePlayer1Change}
            placeholder="Search for a player"
            ref={searchRef}
          /> */}
          {/* <div className="autocomplete">
              <div>
                <select onChange={handlePlayer1Change}>
                  {getPlayer().map((player, index) => (
                    <option key={index}>{player.name}</option>
                  ))}
                </select>
              </div>
            </div> */}
          <Dropdown
            playerPhoto={playerPhoto}
            placeHolder="Select..."
            onStateChange={setPlayer1}
          />
        </div>

        <div className="player-photo-container">

        {player1 && <TeamLogo team={playerPhoto.find((player, index) => player.name === player1)?.team } className="team-logo"/>}

          {player1 && (
            <img
              src={
                playerPhoto.find((player, index) => player.name === player1)
                  ?.photo
              }
              alt={`${player1}`}
              className="player-photo"
            />
          )}

        </div>
        <div className="player-photo-container" >
        {player2 && <TeamLogo team={playerPhoto.find((player, index) => player.name === player2)?.team } className="team-logo"/>}
          {player2 && (
            <img
              src={playerPhoto.find((player) => player.name === player2)?.photo}
              alt={`${player2}`}
              className="player-photo-two"
            />
          )}
        </div>
        <div className="input-two">
          {/* <select onChange={handlePlayer2Change}>
            {Object.values(playerPhoto).map((player, index) => (
              <option key={index}>{player.name}</option>
            ))}
          </select> */}
          <Dropdown
            playerPhoto={playerPhoto}
            placeHolder="Select..."
            isSearchable
            onStateChange={setPlayer2}
          />
        </div>
      </div>
      <div className="stat-input">
        <select className="stat-dropdown" onChange={statCategoryChange}>
          {categories.map((stat, index) => (
            <option key={stat}>{stat}</option>
          ))}
        </select>
      </div>

      <div className="face-off">
        <button
          className="face-off-button"
          onClick={() => {
            setResultModal((prev) => !prev);
          }}
          onChange={getResults()}
        >
          <span>FACE OFF</span>
        </button>
        {resultModal && (
          <ResultModal closeResultModal={setResultModal} result={result} />
        )}
      </div>
    </div>
  );
}

export default OneVOne;
