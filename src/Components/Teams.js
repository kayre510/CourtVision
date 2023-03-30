import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { teamAbbreviation } from './TeamAbbreviation';
import './Teams.css';

function Teams() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:5000/league_standings')
      .then((response) => {
        setTeams(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Group teams by division
  const divisions = {};
  Object.entries(teams).forEach(([teamName, team]) => {
    const division = team['Division'];
    if (!divisions[division]) {
      divisions[division] = [];
    }
    divisions[division].push({ ...team, teamCity: teamName});  });


  return (
    <div>
      <h2>All Teams</h2>
      <div className="teams-container">
        {Object.entries(divisions).map(([division, teams]) => (
          <div key={division} className="division">
            <div className="division-name">{division}</div>
            {teams.map((team, index) => (
              <div key={index} className="team">
                <div className="team-name">{teamAbbreviation[team['Team Name']]} {team['teamCity']} {team['Team Name']}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Teams;
