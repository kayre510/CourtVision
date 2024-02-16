import React, {useState, useEffect} from "react";
import axios from "axios";
import {teamAbbreviation} from "./TeamAbbreviation";
import "./Teams.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function Teams() {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [roster, setRoster] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/league_standings")
      .then((response) => {
        setTeams(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const getRoster = (teamCity, teamName) => {
    const url = `http://127.0.0.1:5000/roster/${teamCity}_${teamName}`;
    axios
      .get(url)
      .then((response) => {
        console.log(response);
        const playersWithPhoto = Object.values(response.data.players).map(
          (player) => {
            let name = player.name;
            let number = player.number;
            let position = player.position;
            let photo = player.name
              ? `${process.env.PUBLIC_URL}/${player.name}.png`
              : "Player is inactive";
            return {name, photo, position, number};
          }
        );
        setRoster(playersWithPhoto);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const divisions = {};
  Object.entries(teams).forEach(([teamName, team]) => {
    const division = team["Division"];
    if (!divisions[division]) {
      divisions[division] = [];
    }
    divisions[division].push({...team, teamCity: teamName});
  });

  const handleTeamClick = (teamCity, teamName) => {
    setSelectedTeam({teamCity, teamName});
    getRoster(teamCity, teamName);
    setShowModal(true);
  };

  return (
    <div>
      <h2>All Teams</h2>
      <div className="teams-container">
        {Object.entries(divisions).map(([division, teams]) => (
          <div key={division} className="card">
            <div className="division-name">{division}</div>
            {teams.map((team, index) => (
              <div key={index} className="team">
                <div
                  className="team-name"
                  onClick={() =>
                    handleTeamClick(team.teamCity, team["Team Name"])
                  }
                >
                  {teamAbbreviation[team["Team Name"]]} {team.teamCity}{" "}
                  {team["Team Name"]}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      {selectedTeam && (
        <div>
          <h2>
            {selectedTeam.teamCity} {selectedTeam.teamName} Roster
          </h2>
          {roster ? (
            <div className="roster-container">
              {roster.map((player, index) => (
                <div key={index} className="player">
                  <div className="player-photo">
                    {player.photo && (
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/nba_player_headshots/" +
                          player.photo
                        }
                        alt={`${player.name} photo`}
                      />
                    )}
                  </div>
                  <div className="player-name">Player: {player.name}</div>
                  <div className="player-number">#: {player.number}</div>
                  <div className="player-position">
                    Position: {player.position}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>Loading roster...</div>
          )}
          <div
            className="modal fade"
            id="rosterModal"
            tabIndex="-1"
            role="dialog"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {selectedTeam.teamCity} {selectedTeam.teamName} Roster
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  {roster ? (
                    <div className="roster-container">
                      {roster.map((player, index) => (
                        <div key={index} className="player">
                          <div className="player-photo">
                            {player.photo && (
                              <img
                                src={
                                  process.env.PUBLIC_URL +
                                  "/nba_player_headshots/" +
                                  player.photo
                                }
                                alt={`${player.name} photo`}
                              />
                            )}
                          </div>
                          <div className="player-name">
                            Player: {player.name}
                          </div>
                          <div className="player-number">
                            #: {player.number}
                          </div>
                          <div className="player-position">
                            Position: {player.position}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div>Loading roster...</div>
                  )}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            data-toggle="modal"
            data-target="#rosterModal"
          >
            View Roster in Modal
          </button>
        </div>
      )}
    </div>
  );
}
export default Teams;
