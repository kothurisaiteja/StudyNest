import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import "../styles/Hero.css";
import logo from "../assets/logo.png";

function Hero() {
    const navigate = useNavigate();

    return (
        <section className="hero" id="home">

            <div className="hero-left">

                <div className="hero-label">
                    YOUR ACADEMIC WORKSPACE
                </div>

                <h1>
                    Study smarter.
                    <br />
                    Stay organized.
                </h1>

                <p>
                    StudyNest brings your notes, assignments,
                    timetable, and progress together in one
                    focused workspace.
                </p>

                <div className="hero-buttons">

                    <button
                        className="primary-btn"
                        onClick={() => navigate("/signup")}
                    >
                        Get Started
                        <ArrowRight size={15} strokeWidth={1.8} />
                    </button>

                    <button
                        className="secondary-btn"
                        onClick={() => navigate("/login")}
                    >
                        Sign in
                    </button>

                </div>

            </div>


            <div className="hero-right">

                <div className="hero-visual">

                    <div className="visual-glow"></div>

                    <img
                        className="hero-image"
                        src={logo}
                        alt="StudyNest"
                    />

                </div>

            </div>

        </section>
    );
}

export default Hero;