import React, { useEffect, useState } from "react";
import AddNote from "../components/AddNote";
import NoteCard from "../components/NoteCard";
import axios from "axios";

export default function Home() {
    const msgStyle = {
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
        height: "50vh",
        color: "#aaa",
        letterSpacing: "1px",
        fontSize: "1.3em",
    };

    const [notes, setNotes] = useState([]);

    // ✅ Use VITE env variable for dynamic API URL
    const API_URL = import.meta.env.VITE_APP_API_URL;

    useEffect(() => {
        const fetchNotes = () => {
            axios
                .get(`${API_URL}/allNotes`)
                .then((res) => {
                    if (res.data.content) {
                        setNotes(res.data.content);
                    } else {
                        setNotes([]);
                    }
                })
                .catch((err) => {
                    console.error("Error fetching notes:", err);
                    setNotes([]);
                });
        };
        fetchNotes();
    }, [API_URL]);

    return (
        <div>
            <h1 className="headline">
                Save Your <span>Notes</span> Here
            </h1>

            <div className="cards">
                {notes && notes.length > 0 ? (
                    notes.map((note) => (
                        <NoteCard key={note._id} note={note} />
                    ))
                ) : (
                    <p style={msgStyle}>No Notes To Show</p>
                )}
            </div>
            <AddNote />
        </div>
    );
}
