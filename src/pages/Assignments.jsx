import "../styles/Assignments.css";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";

import {
    getAssignments as getAssignmentsAPI,
    createAssignment as createAssignmentAPI,
    updateAssignment as updateAssignmentAPI,
    deleteAssignment as deleteAssignmentAPI
} from "../services/assignmentService";

function Assignments() {

    const [showModal, setShowModal] = useState(false);

    const [assignments, setAssignments] = useState([]);

    const [title, setTitle] = useState("");
    const [subject, setSubject] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [description, setDescription] = useState("");

    const [editIndex, setEditIndex] = useState(null);

    const [search, setSearch] = useState("");

    const fetchAssignments = async () => {

        try {

            const data = await getAssignmentsAPI();

            setAssignments(data);

        } catch (error) {

            console.error(error);

        }

    };

    useEffect(() => {

        fetchAssignments();

    }, []);

    const saveAssignment = async () => {

        try {

            if (
                title.trim() === "" ||
                subject.trim() === "" ||
                dueDate === ""
            ) {
                alert("Please fill all required fields");
                return;
            }

            if (editIndex !== null) {

                const assignment = assignments[editIndex];

                await updateAssignmentAPI(
                    assignment.id,
                    {
                        title,
                        subject,
                        due_date: dueDate,
                        status: assignment.status
                    }
                );

                setEditIndex(null);

            } else {

                await createAssignmentAPI({
                    title,
                    subject,
                    due_date: dueDate,
                    status: "Pending"
                });

            }

            await fetchAssignments();

            setTitle("");
            setSubject("");
            setDueDate("");
            setPriority("Medium");
            setDescription("");

            setShowModal(false);

        } catch (error) {

            console.error(error);

            alert("Something went wrong!");

        }

    };

    const handleDelete = async (id) => {

        try {

            await deleteAssignmentAPI(id);

            await fetchAssignments();

        } catch (error) {

            console.error(error);

            alert("Failed to delete assignment");

        }

    };

    const toggleComplete = async (assignment) => {

        try {

            const newStatus =
                assignment.status === "Completed"
                    ? "Pending"
                    : "Completed";

            await updateAssignmentAPI(
                assignment.id,
                {
                    title: assignment.title,
                    subject: assignment.subject,
                    due_date: assignment.due_date,
                    status: newStatus
                }
            );

            await fetchAssignments();

        } catch (error) {

            console.error(error);

            alert("Failed to update assignment");

        }

    };

    const openEditModal = (assignment, index) => {

        setTitle(assignment.title);

        setSubject(assignment.subject);

        setDueDate(assignment.due_date);

        setPriority("Medium");

        setDescription("");

        setEditIndex(index);

        setShowModal(true);

    };

    const closeModal = () => {

        setShowModal(false);

        setEditIndex(null);

        setTitle("");
        setSubject("");
        setDueDate("");
        setPriority("Medium");
        setDescription("");

    };

    return (
        <>
            <Sidebar />

            <div className="assignments-page">

                <div className="assignments-header">

                    <div>

                        <h1>📝 Assignments</h1>

                        <p>
                            Manage your assignments and deadlines.
                        </p>

                    </div>

                    <button
                        className="add-assignment-btn"
                        onClick={() => setShowModal(true)}
                    >
                        + Add Assignment
                    </button>

                </div>

                {showModal && (

                    <div className="modal-overlay">

                        <div className="modal">

                            <h2>
                                {editIndex !== null
                                    ? "Edit Assignment"
                                    : "Add New Assignment"}
                            </h2>

                            <input
                                type="text"
                                placeholder="Assignment title"
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

                            <input
                                type="date"
                                value={dueDate}
                                onChange={(e) =>
                                    setDueDate(e.target.value)
                                }
                            />

                            <select
                                value={priority}
                                onChange={(e) =>
                                    setPriority(e.target.value)
                                }
                            >
                                <option value="Low">
                                    Low
                                </option>

                                <option value="Medium">
                                    Medium
                                </option>

                                <option value="High">
                                    High
                                </option>
                            </select>

                            <textarea
                                placeholder="Description"
                                rows="5"
                                value={description}
                                onChange={(e) =>
                                    setDescription(e.target.value)
                                }
                            />

                            <div className="modal-buttons">

                                <button onClick={closeModal}>
                                    Cancel
                                </button>

                                <button onClick={saveAssignment}>
                                    {editIndex !== null
                                        ? "Update Assignment"
                                        : "Save Assignment"}
                                </button>

                            </div>

                        </div>

                    </div>

                )}

                <div className="search-section">

                    <input
                        type="text"
                        placeholder="Search assignments..."
                        className="search-bar"
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div>

                <div className="assignments-list">

                    {assignments
                        .filter((assignment) =>
                            assignment.title
                                .toLowerCase()
                                .includes(search.toLowerCase()) ||

                            assignment.subject
                                .toLowerCase()
                                .includes(search.toLowerCase())
                        )
                        .map((assignment, index) => (

                            <div
                                className="assignment-card"
                                key={assignment.id}
                            >

                                <div className="assignment-info">

                                    <h2>
                                        {assignment.title}
                                    </h2>

                                    <p>
                                        Subject: {assignment.subject}
                                    </p>

                                    <p>
                                        Due: {assignment.due_date}
                                    </p>

                                </div>

                                <div className="assignment-actions">

                                    <span
                                        className={
                                            assignment.status === "Completed"
                                                ? "status completed"
                                                : "status pending"
                                        }
                                    >
                                        {assignment.status}
                                    </span>

                                    <button
                                        onClick={() =>
                                            toggleComplete(assignment)
                                        }
                                    >
                                        {assignment.status === "Completed"
                                            ? "Undo"
                                            : "Complete"}
                                    </button>

                                    <button
                                        onClick={() =>
                                            openEditModal(
                                                assignment,
                                                index
                                            )
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleDelete(
                                                assignment.id
                                            )
                                        }
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        ))}

                </div>

            </div>
        </>
    );
}

export default Assignments;