import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
    return (
        <nav className="navbar">

            <Link to="/" className="nav-brand">
                <img
                    src={logo}
                    className="nav-logo"
                    alt="StudyNest Logo"
                />

                <span>StudyNest</span>
            </Link>

            <div className="nav-right">

                <ul className="nav-links">

                    <li>
                        <a href="#home">Home</a>
                    </li>

                    <li>
                        <a href="#features">Features</a>
                    </li>

                    <li>
                        <a href="#about">About</a>
                    </li>

                    <li>
                        <a href="#contact">Contact</a>
                    </li>

                </ul>

                <div className="nav-buttons">

                    <Link
                        to="/login"
                        className="login-btn"
                    >
                        Login
                    </Link>

                    <Link
                        to="/signup"
                        className="signup-btn"
                    >
                        Sign Up
                    </Link>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;