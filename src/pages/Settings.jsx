import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/Settings.css";

export default function Settings() {

    const navigate = useNavigate();

    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <>
            <Sidebar />

            <main className="settings-page">

                <div className="settings-header">

                    <span className="settings-eyebrow">
                        ACCOUNT
                    </span>

                    <h1>Settings</h1>

                    <p>
                        Manage your StudyNest account and preferences.
                    </p>

                </div>


                <div className="settings-container">

                    {/* ACCOUNT */}

                    <section className="settings-section">

                        <div className="section-heading">

                            <div>

                                <h2>Account</h2>

                                <p>
                                    Information about your StudyNest account.
                                </p>

                            </div>

                        </div>


                        <div className="setting-row">

                            <div className="setting-info">

                                <h3>Account status</h3>

                                <p>
                                    Your StudyNest account is currently active.
                                </p>

                            </div>


                            <span className="status-badge">

                                <span className="status-dot"></span>

                                Active

                            </span>

                        </div>

                    </section>


                    {/* SECURITY */}

                    <section className="settings-section">

                        <div className="section-heading">

                            <div>

                                <h2>Security</h2>

                                <p>
                                    Manage your current session.
                                </p>

                            </div>

                        </div>


                        <div className="setting-row">

                            <div className="setting-info">

                                <h3>Sign out</h3>

                                <p>
                                    Sign out from your StudyNest account
                                    on this device.
                                </p>

                            </div>


                            <button
                                className="logout-button"
                                onClick={() =>
                                    setShowLogoutConfirm(true)
                                }
                            >
                                Logout
                            </button>

                        </div>

                    </section>


                    {/* FOOTER ACTIONS */}

                    <div className="settings-footer">

                        <Link
                            to="/dashboard"
                            className="back-dashboard"
                        >
                            ← Back to Dashboard
                        </Link>

                    </div>

                </div>

            </main>


            {/* LOGOUT CONFIRMATION */}

            {showLogoutConfirm && (

                <div
                    className="logout-overlay"
                    onClick={() =>
                        setShowLogoutConfirm(false)
                    }
                >

                    <div
                        className="logout-modal"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >

                        <h2>Logout?</h2>

                        <p>
                            Are you sure you want to logout
                            from StudyNest?
                        </p>


                        <div className="logout-modal-actions">

                            <button
                                className="cancel-logout"
                                onClick={() =>
                                    setShowLogoutConfirm(false)
                                }
                            >
                                Cancel
                            </button>


                            <button
                                className="confirm-logout"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </>
    );
}