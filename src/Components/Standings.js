import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Standings() {
  const [standings, setStandings] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/league_standings')
      .then(response => {
        setStandings(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const eastStandings = Object.values(standings).filter(teamData => teamData.Conference === "East").sort((a, b) => a.Rank - b.Rank);
  console.log(eastStandings)
  const westStandings = Object.values(standings).filter(teamData => teamData.Conference === "West").sort((a, b) => a.Rank - b.Rank);


  return (
    <div>
      <h2>Eastern Conference</h2>
      <table>
        <thead>
          <tr>
            <th>Team Name</th>
            <th>Record</th>
            <th>Win Percentage</th>
            <th>Standing</th>
            <th>Win Streak</th>
            <th>Last 10 Games</th>
            <th>Home Record</th>
            <th>Away Record</th>
          </tr>
        </thead>
        <tbody>
          {eastStandings.map(teamData => (
            <tr key={teamData['Team Name']}>
              <td>{teamData['Team Name']}</td>
              <td>{teamData['Record']}</td>
              <td>{teamData['WinPCT']}</td>
              <td>{teamData['Rank']}</td>
              <td>{teamData['CurrentStreak']}</td>
              <td>{teamData['L10']}</td>
              <td>{teamData['HOME']}</td>
              <td>{teamData['ROAD']}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Western Conference</h2>
      <table>
        <thead>
          <tr>
            <th>Team Name</th>
            <th>Record</th>
            <th>Win Percentage</th>
            <th>Playoff Rank</th>
            <th>Win Streak</th>
            <th>Last 10 Games</th>
            <th>Home Record</th>
            <th>Away Record</th>
          </tr>
        </thead>
        <tbody>
          {westStandings.map(teamData => (
            <tr key={teamData['Team Name']}>
              <td>{teamData['Team Name']}</td>
              <td>{teamData['Record']}</td>
              <td>{teamData['WinPCT']}</td>
              <td>{teamData['Playoff Rank']}</td>
              <td>{teamData['CurrentStreak']}</td>
              <td>{teamData['L10']}</td>
              <td>{teamData['HOME']}</td>
              <td>{teamData['ROAD']}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Standings;
