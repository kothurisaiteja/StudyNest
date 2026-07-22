import "../styles/Hero.css";
import logo from "../assets/logo.png";

function Hero(){
    return(
        <section className="hero">
           <div className="hero-left">
               <h1>StudyNest</h1>

                <p>
                    Your AI-powered study companion to organize notes,
                    track assignments, and boost productivity.
                </p>

                <div className="hero-buttons">
                    <button className="primary-btn">Get Started</button>
                    <button className="secondary-btn">Login</button>
                </div>
           </div>
           <div className="hero-right">
                <img className="hero-image" src={logo} alt="StudyNest AI" />
           </div>

        </section>
    )
}

export default Hero;