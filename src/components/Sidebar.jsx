import { NavLink, useNavigate } from "react-router-dom";
import "../Sidebar.css";
import logo from "../assets/logo.png";
function Sidebar() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };
    return (
        <div className="sidebar">
            <div className="sidebar-brand">
                <img src={logo} alt="StudyNest" className="sidebar-logo" />
                <span>StudyNest</span>
            </div>

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
            <button
                className="nav-item logout-btn"
                onClick={handleLogout}
            >
                🚪 Logout
            </button>
        </div>
    );
}

export default Sidebar;