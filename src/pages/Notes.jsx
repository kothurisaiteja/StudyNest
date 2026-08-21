import "../styles/Notes.css";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import {
    getNotes,
    createNote as createNoteAPI,
    updateNote as updateNoteAPI,
    deleteNote as deleteNoteAPI
} from "../services/noteService";
function Notes() {
    const [showModal, setShowModal] = useState(false);

    const [notes, setNotes] = useState([]);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const saveNote = async () => {
        try {

            if (title.trim() === "" || content.trim() === "") {
                alert("Please fill all fields");
                return;
            }

            if (editIndex !== null) {

                await updateNoteAPI(
                    notes[editIndex].id,
                    {
                        title,
                        content
                    }
                );

                setEditIndex(null);

            } else {

                await createNoteAPI({
                    title,
                    content
                });

            }

            await fetchNotes();

            setTitle("");
            setContent("");
            setShowModal(false);

        } catch (error) {
            console.error(error);
            alert("Something went wrong!");
        }
    };
    const handleDelete = async (id) => {
        try {

            await deleteNoteAPI(id);

            await fetchNotes();

        } catch (error) {

            console.error(error);
            alert("Failed to delete note.");

        }
    };
    const togglePin = (index) => {
        const updatedNotes = [...notes];

        updatedNotes[index].pinned = !updatedNotes[index].pinned;

        updatedNotes.sort((a, b) => b.pinned - a.pinned);

        setNotes(updatedNotes);
    };
    const [editIndex, setEditIndex] = useState(null);
    const [search, setSearch] = useState("");
    const fetchNotes = async () => {

        try {

            const data = await getNotes();

            setNotes(data);

        }

        catch (error) {

            console.log(error);

        }

    }
    useEffect(() => {

        fetchNotes();

    }, []);

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
                                    <span>Recently Added</span>

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

                                        <button onClick={() => handleDelete(note.id)}>
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