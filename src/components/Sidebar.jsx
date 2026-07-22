import { NavLink } from "react-router-dom";
import "../Sidebar.css";

function Sidebar() {
    return (
        <div className="sidebar">
            <h2 className="logo">📚 StudyNest</h2>

            <nav>
                <NavLink to="/dashboard" className="nav-item">
                    🏠 Dashboard
                </NavLink>

                <NavLink to="/notes" className="nav-item">
                    📝 Notes
                </NavLink>

                <NavLink to="/assignments" className="nav-item">
                    📋 Assignments
                </NavLink>

                <NavLink to="/timetable" className="nav-item">
                    📅 Timetable
                </NavLink>

                <NavLink to="/progress" className="nav-item">
                    📈 Progress
                </NavLink>

                <NavLink to="/settings" className="nav-item">
                    ⚙️ Settings
                </NavLink>
            </nav>
        </div>
    );
}

export default Sidebar;