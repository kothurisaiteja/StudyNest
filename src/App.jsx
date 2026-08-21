import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Notes from "./pages/Notes";
import Assignments from "./pages/Assignments";
import Progress from "./pages/Progress";
import Dashboard from "./pages/Dashboard";
import Timetable from "./pages/Timetable";
import Settings from "./pages/Settings";
import ProtectedRoute from "./components/ProtectedRoute";

import { Routes, Route } from "react-router-dom";

function App() {
    return (
        <Routes>

            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />

            <Route path="/signup" element={<Signup />} />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/notes"
                element={
                    <ProtectedRoute>
                        <Notes />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/assignments"
                element={
                    <ProtectedRoute>
                        <Assignments />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/timetable"
                element={
                    <ProtectedRoute>
                        <Timetable />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/progress"
                element={
                    <ProtectedRoute>
                        <Progress />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/settings"
                element={
                    <ProtectedRoute>
                        <Settings />
                    </ProtectedRoute>
                }
            />


        </Routes>
    );
}

export default App;