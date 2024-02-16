import React, {useState, useEffect} from "react";
import axios from "axios";
import {teamAbbreviation} from "./TeamAbbreviation";
import "./Teams.css";


// My initial thought process behind this component was focused on achieving core functionality, fetching NBA team data from an API and organizing the data by divisions to display on the UI. I wanted to ensure that users could see all teams categorized neatly, which is why I used a 'useEffect' hook to fetch data on component mount and then processed the data into a divisions object for easier rendering. Looking back at this code, one area I could have improved on would be to enhance error handling. Currently the code logs errors to the console, but from a user experience perspective it would have been better to display a loading indicator or error message on the UI if the data didn't load properly. 

function Teams() {
  const [teams, setTeams] = useState([]);

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

  const divisions = {};
  Object.entries(teams).forEach(([teamName, team]) => {
    const division = team["Division"];
    if (!divisions[division]) {
      divisions[division] = [];
    }
    divisions[division].push(team);
  });

  return (
    <div className="teams-header">
      <h2>All Teams</h2>
      <div className="teams-container">
        {Object.entries(divisions).map(([division, teams]) => (
          <div key={division} className="division">
            <div className="division-name">{division}</div>
            {teams.map((team, index) => (
              <div key={index} className="team">
                <div className="team-name">{team["Team Name"]}</div>
                <div className="team-abbrev">
                  {teamAbbreviation[team["Team Name"]]}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Teams;
