import React, { useContext, useEffect, useRef } from 'react'
import noteContext from '../Context/notes/noteContext';

const NoteEditer = (props) => {
    const context = useContext(noteContext)
    const { newNote, setNewNote, notes, setNotes, addNote, deleteNote, editNote, } = context;
    const { showAlert } = props;

    const saveRef  = useRef(null)

    useEffect(() => {
        document.querySelector("#editNoteIcon").style.display = "none"
        document.getElementById("errorComponent").style.display = "none";

        const handleKeyDown = e => {
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                saveRef.current.click()
                // console.log('CTRL + S was pressed!');
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [])

    const sidebarCloser = () => {
        const sidebar = document.getElementById('sidebar')
        if (sidebar.classList.contains("active")) {
            sidebar.classList.remove("active");
            document.querySelector(".overlay").classList.remove('overlayActive')
        }
    }

    const handleChange = (event) => { 
        const { name, value } = event.target;
        setNewNote({ ...newNote, [name]: value });

        if (newNote.id === "") { return addNote() }

        const editNoteIcon = document.querySelector("#editNoteIcon");
        if (value !== newNote.description || value !== newNote.title) {
            editNoteIcon.style.display = "inline"
        } else {
            editNoteIcon.style.display = "none"
        }
    };

    const handleDeleteClick = () => {
        if (newNote.id) {
            deleteNote(newNote.id)
            showAlert("success", "Deleted successfully");
        }
    }

    const handleSaveClick = () => {
        editNote(newNote.id)
        showAlert("success", "Saved successfully");
        document.querySelector("#editNoteIcon").style.display = "none"

        const descValue = document.getElementsByName("description")[0].value;
        const titleValue = document.getElementsByName("title")[0].value;
        // console.log(titleValue)

        const titleUpdatedValue = titleValue !== "" ? titleValue : "Untitled Note";
        const descUpdatedValue = descValue !== "" ? descValue : "Blank";
        setNotes(notes.map(item => item._id === newNote.id ? { ...item, title: titleUpdatedValue, description: descUpdatedValue } : item));
    }

    return (
        <>
            {/* <div className="container py-3"> */}
            <div className="overlay" onClick={sidebarCloser}></div>
            <div className={`editNoteContainer`}>

                <div className="editerHead">
                    <input value={newNote.title} onChange={handleChange} name='title' type="text" placeholder='Untitled Note' />

                    <span ref={saveRef} className="deleteNoteIcon" id='editNoteIcon' onClick={handleSaveClick}>
                        <i className="fa-solid fa-check"></i>
                    </span>
                    <span className="deleteNoteIcon" onClick={handleDeleteClick}>
                        <i className="fa-solid fa-trash-can"></i>
                    </span>
                </div>
                <div className="editerBody">
                    <textarea value={newNote.description} onChange={handleChange} name='description' placeholder='Type your note'></textarea>
                </div>

            </div>
            {/* </div> */}
        </>
    )
}

export default NoteEditer