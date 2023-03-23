import "./App.css";
import { NavBar } from "./Components/NavBar";
import PlayerSelection from "./Components/PlayerSelection";
import TeamSelection from "./Components/TeamSelection";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OneVOne from "./Components/OneVOne";
import BoxScore from "./Components/BoxScore";
function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="1on1" element={<OneVOne />} />
          <Route path="boxscore" element={<BoxScore />} />
          <Route path="team_selection" element={<TeamSelection />} />
          <Route path="player_selection" element={<PlayerSelection />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
