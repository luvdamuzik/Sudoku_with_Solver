import Navbar from "./Navbar";
import './home.css'
import {Link} from "react-router-dom";

function BasicExample() {
    return (
        <div className="homeDiv">
            <Navbar/>
            <div className="containerHome">
                <span>Sudoku</span>
                <Link to="/play"><button className="playButton">Play</button></Link>
                <Link to="/leaderboard"><button className="leaderboardButton">Leaderboard</button></Link>
            </div>
        </div>

    )
}

export default BasicExample;