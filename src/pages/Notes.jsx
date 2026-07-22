import "../styles/Notes.css";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";

function Notes() {
    const [showModal, setShowModal] = useState(false);

    const [notes, setNotes] = useState(() => {
        const savedNotes = localStorage.getItem("notes");

        if (savedNotes) {
            return JSON.parse(savedNotes);
        }

        return [
            {
                title: "DBMS Revision",
                content: "Normalization, SQL Joins, Transactions, ACID Properties...",
                date: "Today",
                pinned: false
            },
            {
                title: "Operating Systems",
                content: "Deadlocks, Scheduling Algorithms, Paging...",
                date: "Yesterday",
                pinned: false
            }
        ];
    });

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const saveNote = () => {

        if (title.trim() === "" || content.trim() === "") {
            alert("Please fill all fields");
            return;
        }

        if (editIndex !== null) {

            const updatedNotes = [...notes];

            updatedNotes[editIndex] = {
                ...updatedNotes[editIndex],
                title,
                content,
                date: "Edited just now"
            };

            setNotes(updatedNotes);

            setEditIndex(null);

        } else {

            const newNote = {
                title,
                content,
                date: "Just now"
            };

            setNotes([newNote, ...notes]);
        }

        setTitle("");
        setContent("");
        setShowModal(false);
    };
    const deleteNote = (index) => {
        const updatedNotes = notes.filter((_, i) => i !== index);
        setNotes(updatedNotes);
    };
    const togglePin = (index) => {
        const updatedNotes = [...notes];

        updatedNotes[index].pinned = !updatedNotes[index].pinned;

        updatedNotes.sort((a, b) => b.pinned - a.pinned);

        setNotes(updatedNotes);
    };
    const [editIndex, setEditIndex] = useState(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const savedNotes = localStorage.getItem("notes");

        if (savedNotes) {
            setNotes(JSON.parse(savedNotes));
        }
    }, []);
    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes]);
    return (
        <>
            <Sidebar />
            <div className="notes-page">

                <div className="notes-header">
                    <div>
                        <h1>📒 My Notes</h1>
                        <p>Manage all your study notes here.</p>
                    </div>

                    <button
                        className="add-note-btn"
                        onClick={() => setShowModal(true)}
                    >
                        + Add Note
                    </button>
                </div>

                {showModal && (
                    <div className="modal-overlay">
                        <div className="modal">

                            <h2>Add New Note</h2>

                            <input
                                type="text"
                                placeholder="Enter note title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />

                            <textarea
                                placeholder="Write your note..."
                                rows="6"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            ></textarea>

                            <div className="modal-buttons">
                                <button
                                    onClick={() => {
                                        setShowModal(false);
                                        setEditIndex(null);
                                        setTitle("");
                                        setContent("");
                                    }}
                                >
                                    Cancel
                                </button>

                                <button onClick={saveNote}>
                                    Save Note
                                </button>
                            </div>

                        </div>
                    </div>
                )}

                <div className="search-section">
                    <input
                        type="text"
                        placeholder="Search notes..."
                        className="search-bar"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="notes-grid">

                    {notes
                        .filter((note) =>
                            note.title.toLowerCase().includes(search.toLowerCase()) ||
                            note.content.toLowerCase().includes(search.toLowerCase())
                        ).map((note, index) => (
                            <div className="note-card" key={index}>

                                <h2>{note.title}</h2>

                                <p>{note.content}</p>

                                <div className="note-footer">
                                    <span>{note.date}</span>

                                    <div className="button-group">

                                        <button onClick={() => togglePin(index)}>
                                            {note.pinned ? "📌 Unpin" : "📍 Pin"}
                                        </button>

                                        <button
                                            onClick={() => {
                                                setTitle(note.title);
                                                setContent(note.content);
                                                setEditIndex(index);
                                                setShowModal(true);
                                            }}
                                        >
                                            Edit
                                        </button>

                                        <button onClick={() => deleteNote(index)}>
                                            Delete
                                        </button>

                                    </div>
                                </div>

                            </div>
                        ))}

                </div>

            </div>
        </>
    );
}

export default Notes;