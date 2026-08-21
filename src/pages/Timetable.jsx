import "../styles/Timetable.css";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";

import {
    getTimetable,
    createTimetable,
    updateTimetable,
    deleteTimetable
} from "../services/timetableService";

function Timetable() {

    const [sessions, setSessions] = useState([]);

    const [showModal, setShowModal] = useState(false);

    const [subject, setSubject] = useState("");
    const [day, setDay] = useState("Monday");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [room, setRoom] = useState("");

    const [editId, setEditId] = useState(null);

    const fetchSessions = async () => {

        try {

            const data = await getTimetable();

            setSessions(data);

        } catch (error) {

            console.error(error);

        }

    };

    useEffect(() => {

        fetchSessions();

    }, []);

    const resetForm = () => {

        setSubject("");
        setDay("Monday");
        setStartTime("");
        setEndTime("");
        setRoom("");
        setEditId(null);

    };

    const saveSession = async () => {

        if (
            subject.trim() === "" ||
            startTime === "" ||
            endTime === ""
        ) {

            alert("Please fill all required fields");
            return;

        }

        try {

            const sessionData = {
                subject,
                day,
                start_time: startTime,
                end_time: endTime,
                room
            };

            if (editId !== null) {

                await updateTimetable(
                    editId,
                    sessionData
                );

            } else {

                await createTimetable(
                    sessionData
                );

            }

            await fetchSessions();

            resetForm();

            setShowModal(false);

        } catch (error) {

            console.error(error);

            alert("Something went wrong!");

        }

    };

    const handleEdit = (session) => {

        setSubject(session.subject);
        setDay(session.day);
        setStartTime(session.start_time);
        setEndTime(session.end_time);
        setRoom(session.room || "");

        setEditId(session.id);

        setShowModal(true);

    };

    const handleDelete = async (id) => {

        try {

            await deleteTimetable(id);

            await fetchSessions();

        } catch (error) {

            console.error(error);

            alert("Failed to delete session");

        }

    };

    const closeModal = () => {

        resetForm();

        setShowModal(false);

    };

    const sessionsByDay = (day) => {

        return sessions
            .filter((session) => session.day === day)
            .sort((a, b) =>
                a.start_time.localeCompare(b.start_time)
            );

    };

    const days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    return (
        <>
            <Sidebar />

            <div className="timetable-page">

                <div className="timetable-header">

                    <div>

                        <h1>📅 My Timetable</h1>

                        <p>
                            Manage your weekly class sessions.
                        </p>

                    </div>

                    <button
                        className="add-session-btn"
                        onClick={() => {
                            resetForm();
                            setShowModal(true);
                        }}
                    >
                        + Add Session
                    </button>

                </div>


                <div className="weekly-timetable">

                    {days.map((day) => (

                        <div
                            className="day-column"
                            key={day}
                        >

                            <div className="day-header">

                                <h2>{day}</h2>

                            </div>


                            <div className="sessions">

                                {sessionsByDay(day).length === 0 ? (

                                    <p className="no-session">
                                        No sessions
                                    </p>

                                ) : (

                                    sessionsByDay(day).map(
                                        (session) => (

                                            <div
                                                className="session-card"
                                                key={session.id}
                                            >

                                                <h3>
                                                    {session.subject}
                                                </h3>

                                                <p className="session-time">
                                                    🕐{" "}
                                                    {session.start_time}
                                                    {" - "}
                                                    {session.end_time}
                                                </p>

                                                <p className="session-room">
                                                    📍{" "}
                                                    {session.room ||
                                                        "Room not specified"}
                                                </p>

                                                <div className="session-actions">

                                                    <button
                                                        onClick={() =>
                                                            handleEdit(
                                                                session
                                                            )
                                                        }
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                session.id
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </button>

                                                </div>

                                            </div>

                                        )
                                    )

                                )}

                            </div>

                        </div>

                    ))}

                </div>


                {showModal && (

                    <div className="modal-overlay">

                        <div className="modal">

                            <h2>
                                {editId !== null
                                    ? "Edit Session"
                                    : "Add New Session"}
                            </h2>


                            <label>
                                Subject
                            </label>

                            <input
                                type="text"
                                placeholder="e.g. Digital Electronics"
                                value={subject}
                                onChange={(e) =>
                                    setSubject(e.target.value)
                                }
                            />


                            <label>
                                Day
                            </label>

                            <select
                                value={day}
                                onChange={(e) =>
                                    setDay(e.target.value)
                                }
                            >

                                {days.map((dayName) => (

                                    <option
                                        key={dayName}
                                        value={dayName}
                                    >
                                        {dayName}
                                    </option>

                                ))}

                            </select>


                            <label>
                                Session Start
                            </label>

                            <input
                                type="time"
                                value={startTime}
                                onChange={(e) =>
                                    setStartTime(e.target.value)
                                }
                            />


                            <label>
                                Session End
                            </label>

                            <input
                                type="time"
                                value={endTime}
                                onChange={(e) =>
                                    setEndTime(e.target.value)
                                }
                            />


                            <label>
                                Room
                            </label>

                            <input
                                type="text"
                                placeholder="e.g. Room 204"
                                value={room}
                                onChange={(e) =>
                                    setRoom(e.target.value)
                                }
                            />


                            <div className="modal-buttons">

                                <button
                                    onClick={closeModal}
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={saveSession}
                                >
                                    {editId !== null
                                        ? "Update Session"
                                        : "Save Session"}
                                </button>

                            </div>

                        </div>

                    </div>

                )}

            </div>
        </>
    );
}

export default Timetable;