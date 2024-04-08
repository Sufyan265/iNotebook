import React, { useContext } from 'react'
import noteContext from '../Context/notes/noteContext';

const NoteItem2 = (props) => {
    const { note, activeItem, setActiveItem } = props;
    const context = useContext(noteContext)
    const { setNewNote } = context;

    // const [activeItem, setActiveItem] = useState(null);

    const handleEditClick = () => {
        const updatedDesc = note.description === "Blank" ? "" : note.description
        setNewNote({ title: note.title, description: updatedDesc, id: note._id })
        document.querySelector("#editNoteIcon").style.display = "none"
        setActiveItem(note._id)
    };
    
    const dateFormate = (nowDate) => {
        const date = new Date(nowDate);
        const formattedDate = date.toLocaleString("en-US", { month: "long", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit", hour12: true });
        return formattedDate;
    }


    return (
        <>
            <div className={`list-group-item list-group-item-action listItemStyle ${note._id === activeItem ? 'active' : ''}`} aria-current="true" onClick={handleEditClick}>
                <h5 className="mb-1 noteItemHeading ellipsis">{note.title}</h5>
                <p className="mb-1 ellipsis">{note.description}</p>
                <small>{dateFormate(note.date)}</small>
            </div>
        </>
    )
}

export default NoteItem2
