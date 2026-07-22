import Sidebar from "../components/Sidebar";
import "../styles/Dashboard.css";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();
    return (
        <>
            <Sidebar />

            <div className="dashboard">

                <h1>👋 Welcome to StudyNest</h1>

                <p className="dashboard-subtitle">
                    Your AI-powered study companion
                </p>

                <div className="dashboard-cards">

                    <div className="card" onClick={() => navigate("/notes")}>
                        <h2>📒 Notes</h2>
                        <p>Manage all your study notes.</p>
                    </div>

                    <div
                        className="card"
                        onClick={() => navigate("/assignments")}
                    >
                        <h2>📝 Assignments</h2>
                        <p>
                            Keep track of deadlines and never miss an assignment.
                        </p>
                    </div>

                    <div className="card">
                        <h2>📅 Timetable</h2>
                        <p>
                            View today's classes and plan your weekly schedule.
                        </p>
                    </div>

                    <div className="card">
                        <h2>📊 Progress</h2>
                        <p>
                            Monitor your learning progress with visual insights.
                        </p>
                    </div>

                </div>

            </div>
        </>
    );
}

export default Dashboard;