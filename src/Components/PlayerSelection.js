import React, { useEffect, useState } from "react";

function NBAAssistLeaders() {
  const [assistLeaders, setAssistLeaders] = useState([]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://stats.nba.com/stats/assistleaders?LeagueID=00&PerMode=Totals&PlayerOrTeam=Team&Season=2019-20&SeasonType=Regular+Season&jsonp=handleResponse";
    document.body.appendChild(script);

    window.handleResponse = (data) => {
      setAssistLeaders(data.resultSet.rowSet);
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <h1>NBA Assist Leaders</h1>
      <table>
        <thead>
          <tr>
            <th>Team Name</th>
            <th>Assists</th>
          </tr>
        </thead>
        <tbody>
          {assistLeaders.map((row, index) => (
            <tr key={index}>
              <td>{row[0]}</td>
              <td>{row[21]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default NBAAssistLeaders;
