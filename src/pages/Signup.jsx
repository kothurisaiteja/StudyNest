import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/Signup.css";
import { signup } from "../services/authService";

function Signup() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        if (
            username.trim() === "" ||
            email.trim() === "" ||
            password === "" ||
            confirmPassword === ""
        ) {
            setError("Please fill all fields");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {

            await signup({
                username,
                email,
                password
            });

            navigate("/login");

        } catch (error) {

            console.error("Signup error:", error);

            const message =
                error.response?.data?.detail || "";

            if (
                error.response?.status === 400 ||
                error.response?.status === 409 ||
                message.toLowerCase().includes("already") ||
                message.toLowerCase().includes("exist")
            ) {

                setError(
                    "You already have an account. Please login."
                );

            } else {

                setError(
                    "Something went wrong. Please try again."
                );
            }
        }
    };

    return (
        <div className="signup-container">

            <div className="signup-card">

                <div className="auth-brand">
                    StudyNest
                </div>

                <div className="auth-header">

                    <h1>Create your account</h1>

                    <p>
                        Start your learning journey with StudyNest.
                    </p>

                </div>

                {error && (
                    <div className="auth-error">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <div className="auth-field">

                        <label>Full Name</label>

                        <input
                            type="text"
                            placeholder="Enter your full name"
                            value={username}
                            autoComplete="name"
                            onChange={(e) =>
                                setUsername(e.target.value)
                            }
                        />

                    </div>

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
                            placeholder="Create a password"
                            value={password}
                            autoComplete="new-password"
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                        />

                    </div>

                    <div className="auth-field">

                        <label>Confirm Password</label>

                        <input
                            type="password"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            autoComplete="new-password"
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
                        />

                    </div>

                    <button
                        className="auth-button"
                        type="submit"
                    >
                        Create account
                    </button>

                </form>

                <div className="auth-footer">

                    <span>Already have an account?</span>

                    <Link to="/login">
                        Sign in
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default Signup;