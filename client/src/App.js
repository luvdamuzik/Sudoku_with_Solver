import './App.css';
import Sudoku from "./Sudoku";
import Home from "./Home"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./Login";
import Navbar from "./Navbar";
import Register from "./Register";
import Leaderboard from "./Leaderboard";

function setToken(userToken) {
    sessionStorage.setItem('token', JSON.stringify(userToken));
}

export function getToken() {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token
}

function App() {
    const token = getToken();

    return(
        <Router>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/play" element={<Sudoku />}/>
                <Route path="/leaderboard" element={<Leaderboard/>}/>
                <Route path="/login" element={<Login setToken={setToken}/>}/>
                <Route path="/register" element={<Register/>}/>
            </Routes>
        </Router>
    )
}

export default App;
