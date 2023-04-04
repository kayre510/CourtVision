// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { teamAbbreviation } from './TeamAbbreviation';
// import './Teams.css';

// function Teams() {
//   const [teams, setTeams] = useState([]);

//   useEffect(() => {
//     axios
//       .get('http://127.0.0.1:5000/league_standings')
//       .then((response) => {
//         setTeams(response.data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, []);

//   // Group teams by division
//   const divisions = {};
//   Object.entries(teams).forEach(([teamName, team]) => {
//     const division = team['Division'];
//     if (!divisions[division]) {
//       divisions[division] = [];
//     }
//     divisions[division].push({ ...team, teamCity: teamName});  });


//   return (
//     <div>
//       <h2>All Teams</h2>
//       <div className="teams-container">
//         {Object.entries(divisions).map(([division, teams]) => (
//           <div key={division} className="division">
//             <div className="division-name">{division}</div>
//             {teams.map((team, index) => (
//               <div key={index} className="team">
//                 <div className="team-name">{teamAbbreviation[team['Team Name']]} {team['teamCity']} {team['Team Name']}</div>
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Teams;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { teamAbbreviation } from './TeamAbbreviation';
import './Teams.css';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [roster, setRoster] = useState(null);

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

  const getRoster = (teamCity, teamName) => {
    const url = `http://127.0.0.1:5000/roster/<${teamCity}_${teamName}>`;
    axios.get(url)
      .then(response => {
        setRoster(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  // Group teams by division
  const divisions = {};
  Object.entries(teams).forEach(([teamName, team]) => {
    const division = team['Division'];
    if (!divisions[division]) {
      divisions[division] = [];
    }
    divisions[division].push({ ...team, teamCity: teamName});  });

  const handleTeamClick = (teamCity, teamName) => {
    setSelectedTeam({teamCity, teamName});
    getRoster(teamCity, teamName);
  }

  return (
    <div>
      <h2>All Teams</h2>
      <div className="teams-container">
        {Object.entries(divisions).map(([division, teams]) => (
          <div key={division} className="division">
            <div className="division-name">{division}</div>
            {teams.map((team, index) => (
              <div key={index} className="team">
                <div className="team-name" onClick={() => handleTeamClick(team.teamCity, team['Team Name'])}>
                  {teamAbbreviation[team['Team Name']]} {team.teamCity} {team['Team Name']}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      {selectedTeam && (
        <div>
          <h2>{selectedTeam.teamCity} {selectedTeam.teamName} Roster</h2>
          {roster ? (
            <div className="roster-container">
              {roster.players.map((player, index) => (
                <div key={index} className="player">
                  <div className="player-name">{player.name}</div>
                  <div className="player-number">{player.number}</div>
                  <div className="player-position">{player.position}</div>
                </div>
              ))}
            </div>
          ) : (
            <div>Loading roster...</div>
          )}
        </div>
      )}
    </div>
  );
}

export default Teams;
