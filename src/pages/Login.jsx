import "../styles/Login.css";
import { Link } from "react-router-dom"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === "" || password === "") {
            setError("Please fill all fields");
            return;
        }

        setError("");

        navigate("/dashboard");
    }
    return (
        <div className="login-container">
            <div className="login-card">
                <h1>Welcome Back 👋</h1>
                <p>Login to Continue your StudyNest journey</p>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <label>Email</label>
                    <input type="email" placeholder="Enter your email"
                        value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label>Password</label>
                    <input type="password" placeholder="Enter your Password"
                        value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit">Login</button>
                    <p>
                        Don't have an account?
                        <Link to="/signup"> Sign Up</Link>
                    </p>
                </form>
            </div>

        </div>
    );
}

export default Login;