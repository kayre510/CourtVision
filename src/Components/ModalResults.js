import React, {useState, useEffect} from 'react'
import axios from 'axios'
export const ModalResults = ({boxscoreinfo}) => {

    const [gameID, setGameID] = useState("")
console.log(boxscoreinfo.game.arena)


  return (
    <div>
        <p>City:{boxscoreinfo.game.arena.arenaCity}</p>
        <p>Arena:{boxscoreinfo.game.arena.arenaName}</p>
        <p>Attendance:  {boxscoreinfo.game.attendance}</p>
        <table></table>
    </div>
  )
}
