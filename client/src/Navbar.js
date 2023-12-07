import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {getToken} from "./App";

function BasicExample() {
    const token = getToken();

    function logout(){
        const reponse = fetch("http://localhost:5000/logout",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
        });
        sessionStorage.clear()
    }

    if(token){
        return (
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="/">Home</Navbar.Brand>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/play">Play</Nav.Link>
                            <Nav.Link href="/leaderboard">Leaderboard</Nav.Link>
                        </Nav>
                        <Nav className="justify-content-end">
                            <Nav.Link href="/" onClick={logout}>Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }else{
        return (
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="/">Home</Navbar.Brand>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/play">Play</Nav.Link>
                            <Nav.Link href="/leaderboard">Leaderboard</Nav.Link>
                        </Nav>
                        <Nav className="justify-content-end">
                            <Nav.Link href="/login">Login</Nav.Link>
                            <Nav.Link href="/register" >Register</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }

}

export default BasicExample;