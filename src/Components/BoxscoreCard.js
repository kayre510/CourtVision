import React, { useState } from "react";
import "./BoxscoreCard.css"
export const BoxscoreCard = ({ gameInfo }) => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleGameClick = (index) => {
    setSelectedGame(index);

    setModalOpen(true);



  };

  const handleCloseModal = () => {
    setSelectedGame(null);
    setModalOpen(false);
  };

  return (
    <div className={`container ${modalOpen ? 'blur' : ''}`}>
      <div className="no-game-container">
        {gameInfo.length === 0 ? (
          <p className="no-game">No game info. Check back later...</p>
        ) : (
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {gameInfo.map((matchup, index) => (
              <div className="col" key={index}>
                <div
                  className={`card h-100 ${
                    index === selectedGame ? 'selected' : ''
                  }`}
                  onClick={() => handleGameClick(index)}
                  onMouseEnter={() => setSelectedGame(index)}
                  onMouseLeave={() => setSelectedGame(null)}
                >
                  <img src="..." className="card-img-top" alt="" />
                  {matchup.map((innerMatchup, innerIndex) => (
                    <div className="card-body" key={innerIndex}>
                      <h5 className="card-title">{innerMatchup.matchup}</h5>
                      <p className="card-text">
                        {innerMatchup.losing_team_points} -{' '}
                        {innerMatchup.winning_team_points}
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
            ))}
          </div>
        )}
      </div>

      {modalOpen && (
        <div className="modalBackground">
          <div className="modalContainer">
            <div className="card" style={{ width: '18rem' }}>
              <div className="card-body">
                <p className="card-text">Additional Stats</p>
                {gameInfo.map((stat, index) => (
                  <div key={index}>
                    {index === selectedGame && (
                      <p key={selectedGame}>{stat?.game_date}</p>
                    )}
                  </div>
                ))}
                <button onClick={handleCloseModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  }
