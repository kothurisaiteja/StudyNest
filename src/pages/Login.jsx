import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../services/authService";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (email === "" || password === "") {
            setError("Please fill all fields");
            return;
        }

        setError("");

        try {
            const response = await login({
                email,
                password
            });

            localStorage.setItem(
                "token",
                response.access_token
            );

            navigate("/dashboard");

        } catch (error) {
            setError("Invalid email or password");
        }
    };

    return (
        <div className="login-container">

            <div className="login-card">

                <div className="auth-brand">
                    StudyNest
                </div>

                <div className="auth-header">
                    <h1>Welcome back</h1>

                    <p>
                        Sign in to continue your learning journey.
                    </p>
                </div>

                {error && (
                    <div className="auth-error">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <div className="auth-field">
                        <label>Email</label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            autoComplete="email"
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                        />
                    </div>

                    <div className="auth-field">
                        <label>Password</label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            autoComplete="current-password"
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                        />
                    </div>

                    <button
                        className="auth-button"
                        type="submit"
                    >
                        Login
                    </button>

                </form>

                <div className="auth-footer">
                    <span>Don't have an account?</span>

                    <Link to="/signup">
                        Create account
                    </Link>
                </div>

            </div>

        </div>
    );
}

export default Login;