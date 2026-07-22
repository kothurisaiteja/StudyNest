import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
function Navbar() {
    return (
        <nav>
            <div className="nav-brand">
                <img className="nav-logo" src={logo} alt="StudyNest Logo" />
                <h2>StudyNest</h2>
            </div>
            <div className="nav-right">
                <ul className="nav-links">
                    <li>Home</li>
                    <li>Features</li>
                    <li>About</li>
                    <li>Contact</li>
                </ul>
                <div className="nav-buttons">
                    <Link to="/login" className="login-btn">
                        Login
                    </Link>

                    <Link to="/signup" className="signup-btn">
                        Sign Up
                    </Link>
                </div>
            </div>

        </nav>
    )
}

export default Navbar;