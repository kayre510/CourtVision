import "./App.css";
import { NavBar } from "./Components/NavBar";
import PlayerSelection from "./Components/PlayerSelection";
import TeamSelection from "./Components/TeamSelection";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OneVOne from "./Components/OneVOne";
import BoxScore from "./Components/BoxScore";
import PlayerList from "./Components/PlayerList";
import Standings from "./Components/Standings";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="1on1" element={<OneVOne />} />
          <Route path="players" element={<PlayerList />} />
          <Route path="boxscore" element={<BoxScore />} />
          <Route path="team_selection" element={<TeamSelection />} />
          <Route path="player_selection" element={<PlayerSelection />} />
          <Route path="standings" element={<Standings />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
