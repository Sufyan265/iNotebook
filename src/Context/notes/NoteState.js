import { useContext, useState } from 'react';
import NoteContext from './noteContext';
import { UserContext } from './UserContext';

const NoteState = (props) => {
    // const host = "http://localhost:5000";
    const host = "https://inotebook-backend-tau.vercel.app";

    const { catchError, handleError, errorMessage, setProgress } = useContext(UserContext);

    // const notesInitial = [
    //     {
    //         "_id": "65e8b63cf4667c8e953d59373",
    //         "user": "65e2cc5f43fb53c3f6641b28",
    //         "title": "Example title Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet quam ab corrupti vitae ea quibusdam consequuntur, dicta rem soluta illo! Dolorum culpa ducimus sit. ",
    //         "description": " Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet quam ab corrupti vitae ea quibusdam consequuntur, dicta rem soluta illo! Dolorum culpa ducimus sit. Praesentium dolorum sit, totam ducimus dolorem esse aliquam? Suscipit, voluptas? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum, at nostrum minus ab unde quod iure reprehenderit laudantium? Natus accusantium veniam voluptatibus ipsum labore molestiae officiis illo, illum accusamus explicabo.",
    //         "tag": "persnel",
    //         "date": "2023-03-06T18:30:20.074Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "65e954dc7762730314bcfa053",
    //         "user": "65e2cc5f43fb53c3f6641b28",
    //         "title": "Example title 2",
    //         "description": "Kindly! wake up early",
    //         "tag": "persnel",
    //         "date": "2024-03-07T05:47:08.150Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "65ebdfaedb64362d2ec7bb62d",
    //         "user": "65e2cc5f43fb53c3f6641b28",
    //         "title": "Example title 3",
    //         "description": "Kindly! wake up early. That is third doc",
    //         "tag": "persnel",
    //         "date": "2024-03-09T04:03:58.189Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "65e8b63cf4667c8e953d59336",
    //         "user": "65e2cc5f43fb53c3f6641b28",
    //         "title": "Example title 4",
    //         "description": "Please! wake up early",
    //         "tag": "persnel",
    //         "date": "2024-03-06T18:30:20.074Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "65e954dc7762730314bcfa055",
    //         "user": "65e2cc5f43fb53c3f6641b28",
    //         "title": "Example title",
    //         "description": "Kindly! wake up early",
    //         "tag": "persnel",
    //         "date": "2024-03-07T05:47:08.150Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "65ebdfaedb26362d2ec7bb62d",
    //         "user": "65e2cc5f43fb53c3f6641b28",
    //         "title": "Example title",
    //         "description": "Kindly! wake up early. That is third doc",
    //         "tag": "persnel",
    //         "date": "2024-03-09T04:03:58.189Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "65e8b63cf4667c8e953d59335",
    //         "user": "65e2cc5f43fb53c3f6641b28",
    //         "title": "Example title",
    //         "description": "Please! wake up early",
    //         "tag": "persnel",
    //         "date": "2024-03-06T18:30:20.074Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "65e954dc7762730314bcfa0562",
    //         "user": "65e2cc5f43fb53c3f6641b28",
    //         "title": "Example title",
    //         "description": "Kindly! wake up early",
    //         "tag": "persnel",
    //         "date": "2024-03-07T05:47:08.150Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "65ebdfaedb6362d2ec7bb62d13",
    //         "user": "65e2cc5f43fb53c3f6641b28",
    //         "title": "Example title",
    //         "description": "Kindly! wake up early. That is third doc",
    //         "tag": "persnel",
    //         "date": "2024-03-09T04:03:58.189Z",
    //         "__v": 0
    //     },
    // ]
    const notesInitial2 = [];

    const [notes, setNotes] = useState(notesInitial2)

    const [newNote, setNewNote] = useState({ title: "", description: "", id: "" });

    // Get all Notes ↓
    const getNotes = async () => {
        // API Call ↓
        try {
            setProgress(10)
            const response = await fetch(`${host}/api/notes/getallnotes`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token")
                },
            });
            if (!response.ok) {
                throw new Error(`${response}`);
            }
            setProgress(40)
            const data = await response.json();
            // console.log(data)
            const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
            setProgress(60)
            setNotes(sortedData)
            handleError(false)
            setProgress(100)
        } catch (error) {
            catchError(error);
        }
    }

    // Add a Note ↓
    const addNote = async () => {
        // API Call ↓
        try {
            setProgress(10);
            const response = await fetch(`${host}/api/notes/addnote`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token")
                },
                body: JSON.stringify({ title: "Untitled Note", description: "Blank", tag: "persnel" }),
            });
            setProgress(60);
            const data = await response.json();
            // console.log(data)

            // const addNewNote = {
            //     "_id": "65e954dc7762730314bcfa05333",
            //     "user": "65e2cc5f43fb53c3f6641b28",
            //     "title": "Untitled",
            //     "description": "Blank",
            //     "tag": "persnel",
            //     "date": "2024-03-07T05:47:08.150Z",
            //     "__v": 0
            // }
            // setNotes(notes.concat(addNewNote))
            const updatedNotes = [...notes];
            updatedNotes.unshift(data);
            setNotes(updatedNotes);

            setNewNote({ title: "", description: "", id: data._id })
            setProgress(100);
        } catch (error) {
            catchError(error);
        }
    }

    // Delete a Note ↓
    const deleteNote = async (id) => {
        // API Call ↓
        try {
            setProgress(10);
            await fetch(`${host}/api/notes/deletenote/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token")
                },
            });
            // const data = await response.json();
            // console.log(data)
            setProgress(60);
            const filteredNotes = notes.filter((item) => { return item._id !== id })
            setNotes(filteredNotes)
            setNewNote({ title: "", description: "", id: "" })
            console.log("The Note has been deleted by the id of: " + id)
            setProgress(100);
        } catch (error) {
            catchError(error);
        }
    }

    // Edit a Note ↓
    const editNote = async (id) => {
        // API Call ↓
        try {
            setProgress(30);
            await fetch(`${host}/api/notes/updatenote/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token")
                },
                body: JSON.stringify({ title: newNote.title, description: newNote.description, tag: "persnel" }),
            });
            // const data = response.json();
            // console.log("Note edited: ", newNote.title,  newNote.description)     
            setProgress(100);       
        } catch (error) {
            catchError(error);
        }
    }


    return (
        <NoteContext.Provider value={{
            notes,
            setNotes,
            newNote,
            setNewNote,

            getNotes,
            addNote,
            deleteNote,
            editNote,

            catchError,
            handleError,
            errorMessage,
        }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
