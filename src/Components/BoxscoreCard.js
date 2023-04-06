import React, { useState, useEffect } from "react";
import "./BoxscoreCard.css";
import * as NBAIcons from "react-nba-logos";
import axios from "axios";
import { ModalResults } from "./ModalResults";

export const BoxscoreCard = ({ gameInfo }) => {
  const gameIDs = gameInfo.map((gameID) =>
    gameID.map((id, index) => id.game_id)
  );

  const [selectedGame, setSelectedGame] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [gameID, setGameID] = useState("");
  const [boxscoreinfo, setBoxScoreInfo] = useState([]);

  const handleGameClick = (index) => {
    setSelectedGame(index);
    setModalOpen(true);
    setGameID(index);
  };

  const handleCloseModal = () => {
    setSelectedGame(null);
    setModalOpen(false);
  };

  useEffect(() => {
    if (gameID !== "") {
      axios
        .get(`http://127.0.0.1:5000/boxscore/${gameID}`)
        .then((response) => {

      setBoxScoreInfo(response.data);

    })}
  }, [gameID]);

  return (
    <div className={`container ${modalOpen ? "blur" : ""}`}>
      {gameInfo.length === 0 ? (
        <p className="no-game">No game info. Check back later...</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {gameInfo.map((matchup, index) => {
            const winningTeamAbbrev = matchup[0].winning_team_abbrev;
            const losingTeamAbbrev = matchup[0].losing_team_abbrev;
            const WinningLogoComponent =
              NBAIcons[winningTeamAbbrev.toUpperCase()];
            const LosingLogoComponnent =
              NBAIcons[losingTeamAbbrev.toUpperCase()];
            return (
              <div className="col" key={index}>
                <div
                  className={`card h-100 ${
                    index === selectedGame ? "selected" : ""
                  }`}
                  onClick={() => handleGameClick(matchup[0].game_id)}
                  onMouseEnter={() => setSelectedGame(index)}
                  onMouseLeave={() => setSelectedGame(null)}
                >
                  <img src="..." className="card-img-top" alt="" />
                  {matchup.map((innerMatchup, innerIndex) => (
                    <div className="card-body" key={innerIndex}>
                      <h3>{innerMatchup.game_date}</h3>
                      <h5 className="card-title">
                        <WinningLogoComponent />{" "}
                        {innerMatchup.winning_team_abbrev} VS.{" "}
                        {innerMatchup.losing_team_abbrev}
                        <LosingLogoComponnent />
                      </h5>
                      <p className="card-text matchpoints">
                        {innerMatchup.winning_team_points} -
                        {innerMatchup.losing_team_points}
                      </p>
                    </div>
                  ))}
                  {index === selectedGame && (
                    <div className="additional-stats">
                      <p>Winner: {matchup[0].winning_team}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {modalOpen && (
        <div className="modalBackground">
          <div className="modalContainer">
            <div className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <p className="card-text">Additional Stats</p>
                <ModalResults gameID={gameID} boxscoreinfo={boxscoreinfo} />
                <button onClick={handleCloseModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
