import { Mail, GitBranch } from "lucide-react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

function Footer() {
    return (
        <footer className="footer">

            <div className="footer-main">

                <div className="footer-brand">
                    <Link to="/" className="footer-logo">
                        StudyNest
                    </Link>

                    <p>
                        A focused workspace for a more organized
                        and productive academic life.
                    </p>
                </div>


                <div className="footer-links">

                    <div className="footer-column">
                        <h3>Product</h3>

                        <a href="#features">Features</a>
                        <a href="#about">About</a>
                        <a href="#contact">Contact</a>
                    </div>


                    <div className="footer-column">
                        <h3>Account</h3>

                        <Link to="/login">Login</Link>
                        <Link to="/signup">Create account</Link>
                    </div>


                    <div className="footer-column">
                        <h3>Contact</h3>

                        <a
                            href="mailto:kothurisaiteja1@gmail.com"
                        >
                            <Mail size={14} />
                            Email us
                        </a>

                        <a
                            href="https://github.com/kothurisaiteja"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <GitBranch size={14} />
                            GitHub
                        </a>
                    </div>

                </div>

            </div>


            <div className="footer-bottom">

                <span>
                    © {new Date().getFullYear()} StudyNest
                </span>

                <span>
                    Built for better learning.
                </span>

            </div>

        </footer>
    );
}

export default Footer;