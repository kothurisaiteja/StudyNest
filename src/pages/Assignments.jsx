import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/Assignments.css"
export default function Assignments() {
    const [assignments, setAssignments] = useState(() => {
        const saved = localStorage.getItem("assignments");
        if (saved) return JSON.parse(saved);

        return [
            {
                id: 1,
                title: "DBMS Assignment",
                subject: "DBMS",
                priority: "High",
                dueDate: "2026-07-28",
                status: "Pending",
                description: "Solve SQL Join and Normalization questions."
            },
            {
                id: 2,
                title: "Operating Systems",
                subject: "OS",
                priority: "Medium",
                dueDate: "2026-07-30",
                status: "Completed",
                description: "Practice Deadlock algorithms."
            }
        ];
    });

    const [showModal, setShowModal] = useState(false);
    const [search, setSearch] = useState("");

    const [title, setTitle] = useState("");
    const [subject, setSubject] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [dueDate, setDueDate] = useState("");
    const [description, setDescription] = useState("");

    const [editId, setEditId] = useState(null);

    useEffect(() => {
        localStorage.setItem("assignments", JSON.stringify(assignments));
    }, [assignments]);

    const resetForm = () => {
        setTitle("");
        setSubject("");
        setPriority("Medium");
        setDueDate("");
        setDescription("");
        setEditId(null);
    };

    const openAddModal = () => {
        resetForm();
        setShowModal(true);
    };

    const saveAssignment = () => {
        if (
            title.trim() === "" ||
            subject.trim() === "" ||
            dueDate === ""
        ) {
            alert("Please fill all required fields.");
            return;
        }

        if (editId !== null) {
            setAssignments(
                assignments.map((item) =>
                    item.id === editId
                        ? {
                            ...item,
                            title,
                            subject,
                            priority,
                            dueDate,
                            description
                        }
                        : item
                )
            );
        } else {
            const newAssignment = {
                id: Date.now(),
                title,
                subject,
                priority,
                dueDate,
                description,
                status: "Pending"
            };

            setAssignments([newAssignment, ...assignments]);
        }

        setShowModal(false);
        resetForm();
    };

    const editAssignment = (item) => {
        setTitle(item.title);
        setSubject(item.subject);
        setPriority(item.priority);
        setDueDate(item.dueDate);
        setDescription(item.description);
        setEditId(item.id);
        setShowModal(true);
    };

    const deleteAssignment = (id) => {
        if (!window.confirm("Delete this assignment?")) return;

        setAssignments(assignments.filter((item) => item.id !== id));
    };

    const toggleStatus = (id) => {
        setAssignments(
            assignments.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        status:
                            item.status === "Pending"
                                ? "Completed"
                                : "Pending"
                    }
                    : item
            )
        );
    };

    const filteredAssignments = assignments.filter((item) => {
        return (
            item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.subject.toLowerCase().includes(search.toLowerCase())
        );
    });

    return (
        <>
            <Sidebar />

            <div className="assignments-page">

                <div className="assignments-header">
                    <h1>Assignments</h1>

                    <button
                        className="add-btn"
                        onClick={openAddModal}
                    >
                        + Add Assignment
                    </button>
                </div>

                <input
                    className="search-box"
                    type="text"
                    placeholder="Search assignments..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <div className="assignment-grid">

                    {filteredAssignments.length === 0 ? (
                        <h3>No Assignments Found</h3>
                    ) : (
                        filteredAssignments.map((item) => (
                            <div
                                className="assignment-card"
                                key={item.id}
                            >
                                <div className="card-top">

                                    <h2>{item.title}</h2>

                                    <span
                                        className={`priority ${item.priority.toLowerCase()}`}
                                    >
                                        {item.priority}
                                    </span>

                                </div>

                                <p>
                                    <strong>Subject:</strong>{" "}
                                    {item.subject}
                                </p>

                                <p>
                                    <strong>Due:</strong>{" "}
                                    {item.dueDate}
                                </p>

                                <p>
                                    <strong>Status:</strong>{" "}
                                    <span
                                        className={
                                            item.status === "Completed"
                                                ? "completed"
                                                : "pending"
                                        }
                                    >
                                        {item.status}
                                    </span>
                                </p>

                                <p>{item.description}</p>

                                <div className="button-group">

                                    <button
                                        className="edit-btn"
                                        onClick={() =>
                                            editAssignment(item)
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="delete-btn"
                                        onClick={() =>
                                            deleteAssignment(item.id)
                                        }
                                    >
                                        Delete
                                    </button>

                                    <button
                                        className="complete-btn"
                                        onClick={() =>
                                            toggleStatus(item.id)
                                        }
                                    >
                                        {item.status === "Completed"
                                            ? "Undo"
                                            : "Complete"}
                                    </button>

                                </div>

                            </div>
                        ))
                    )}

                </div>

                {showModal && (
                    <div className="modal-overlay">

                        <div className="modal">

                            <h2>
                                {editId
                                    ? "Edit Assignment"
                                    : "Add Assignment"}
                            </h2>

                            <input
                                type="text"
                                placeholder="Assignment Title"
                                value={title}
                                onChange={(e) =>
                                    setTitle(e.target.value)
                                }
                            />

                            <input
                                type="text"
                                placeholder="Subject"
                                value={subject}
                                onChange={(e) =>
                                    setSubject(e.target.value)
                                }
                            />

                            <select
                                value={priority}
                                onChange={(e) =>
                                    setPriority(e.target.value)
                                }
                            >
                                <option>High</option>
                                <option>Medium</option>
                                <option>Low</option>
                            </select>

                            <input
                                type="date"
                                value={dueDate}
                                onChange={(e) =>
                                    setDueDate(e.target.value)
                                }
                            />

                            <textarea
                                rows="5"
                                placeholder="Description"
                                value={description}
                                onChange={(e) =>
                                    setDescription(e.target.value)
                                }
                            />

                            <div className="modal-buttons">

                                <button
                                    className="cancel-btn"
                                    onClick={() => {
                                        resetForm();
                                        setShowModal(false);
                                    }}
                                >
                                    Cancel
                                </button>

                                <button
                                    className="save-btn"
                                    onClick={saveAssignment}
                                >
                                    Save
                                </button>

                            </div>

                        </div>

                    </div>
                )}

            </div>
        </>
    );
}