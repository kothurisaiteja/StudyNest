import Sidebar from "../components/Sidebar";
import "../styles/Dashboard.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getDashboard } from "../services/dashboardService";

function Dashboard() {

    const navigate = useNavigate();

    const [dashboardData, setDashboardData] = useState({
        total_notes: 0,
        total_assignments: 0,
        pending_assignments: 0,
        completed_assignments: 0,
    });

    useEffect(() => {

        const fetchDashboard = async () => {

            try {

                const data = await getDashboard();

                setDashboardData(data);

            } catch (error) {

                console.error(error);

            }

        };

        fetchDashboard();

    }, []);

    const totalAssignments =
        dashboardData.total_assignments;

    const completion =
        totalAssignments === 0
            ? 0
            : Math.round(
                (dashboardData.completed_assignments /
                    totalAssignments) * 100
            );

    return (
        <>
            <Sidebar />

            <main className="dashboard">

                <section className="dashboard-header">

                    <div>
                        <p className="dashboard-label">
                            STUDY OVERVIEW
                        </p>

                        <h1>
                            Welcome back
                        </h1>

                        <p className="dashboard-subtitle">
                            Here's a quick overview of your learning activity.
                        </p>
                    </div>

                </section>


                <section className="stats-grid">

                    <div
                        className="stat-card"
                        onClick={() => navigate("/notes")}
                    >
                        <div className="stat-top">
                            <span className="stat-title">
                                Notes
                            </span>

                            <span className="stat-icon blue">
                                N
                            </span>
                        </div>

                        <h2>
                            {dashboardData.total_notes}
                        </h2>

                        <p>
                            Total notes
                        </p>
                    </div>


                    <div
                        className="stat-card"
                        onClick={() => navigate("/assignments")}
                    >
                        <div className="stat-top">
                            <span className="stat-title">
                                Assignments
                            </span>

                            <span className="stat-icon green">
                                A
                            </span>
                        </div>

                        <h2>
                            {dashboardData.total_assignments}
                        </h2>

                        <p>
                            Total assignments
                        </p>
                    </div>


                    <div
                        className="stat-card"
                        onClick={() => navigate("/assignments")}
                    >
                        <div className="stat-top">
                            <span className="stat-title">
                                Pending
                            </span>

                            <span className="stat-icon orange">
                                P
                            </span>
                        </div>

                        <h2>
                            {dashboardData.pending_assignments}
                        </h2>

                        <p>
                            Need your attention
                        </p>
                    </div>


                    <div
                        className="stat-card"
                        onClick={() => navigate("/progress")}
                    >
                        <div className="stat-top">
                            <span className="stat-title">
                                Completion
                            </span>

                            <span className="stat-icon purple">
                                %
                            </span>
                        </div>

                        <h2>
                            {completion}%
                        </h2>

                        <p>
                            Assignment completion
                        </p>
                    </div>

                </section>


                <section className="dashboard-bottom">

                    <div className="overview-card">

                        <div className="section-heading">
                            <div>
                                <h2>
                                    Learning overview
                                </h2>

                                <p>
                                    Your assignment completion
                                </p>
                            </div>

                            <span>
                                {completion}%
                            </span>
                        </div>

                        <div className="progress-track">

                            <div
                                className="progress-value"
                                style={{
                                    width: `${completion}%`
                                }}
                            />

                        </div>

                        <div className="progress-info">

                            <span>
                                {dashboardData.completed_assignments} completed
                            </span>

                            <span>
                                {dashboardData.pending_assignments} pending
                            </span>

                        </div>

                    </div>


                    <div className="quick-card">

                        <div className="section-heading">
                            <div>
                                <h2>
                                    Quick actions
                                </h2>

                                <p>
                                    Continue where you left off
                                </p>
                            </div>
                        </div>

                        <div className="quick-actions">

                            <button
                                onClick={() => navigate("/notes")}
                            >
                                <span>+ Add note</span>
                                <span>→</span>
                            </button>

                            <button
                                onClick={() => navigate("/assignments")}
                            >
                                <span>View assignments</span>
                                <span>→</span>
                            </button>

                            <button
                                onClick={() => navigate("/timetable")}
                            >
                                <span>View timetable</span>
                                <span>→</span>
                            </button>

                        </div>

                    </div>

                </section>

            </main>
        </>
    );
}

export default Dashboard;