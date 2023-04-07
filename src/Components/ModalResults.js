import React, { useState, useEffect } from "react";
import axios from "axios";
export const ModalResults = ({ gameID, boxscoreinfo }) => {
  if (boxscoreinfo.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <p>HI</p>
      <p>City:{boxscoreinfo.game.arena.arenaCity}</p>
      <p>Arena:{boxscoreinfo.game.arena.arenaName}</p>
      <p>Attendance: {boxscoreinfo.game.attendance}</p>
      <table></table>
    </div>
  );
};
