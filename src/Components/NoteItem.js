import React, { useState } from 'react'

const NoteItem = (props) => {
    const { note } = props;

    const dateFormate = (nowDate) => {
        const date = new Date(nowDate);
        const formattedDate = date.toLocaleString("en-US", { month: "long", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit", hour12: true });
        return formattedDate;
    }

    const [showPopup, setShowPopup] = useState(false);
    // const [popupContent, setPopupContent] = useState({ title: note.title, description: note.description });
    const popupContent = {
        title: note.title,
        description: note.description
    };

    const fullNoteHandler = () => {
        closePopupHandler();
        setShowPopup(true);
        // popupContent({ title, description });
    };

    const closePopupHandler = () => {
        setShowPopup(false);
        setNoteText(popupContent.description);
    };

    // _________________edit note_________________
    const [noteTitle, setNoteTitle] = useState(popupContent.title);
    const handleTitleChange = (event) => {
        setNoteTitle(event.target.value);
        autoResize(event.target);
    };

    const [noteText, setNoteText] = useState(popupContent.description);
    const handleNoteChange = (event) => {
        setNoteText(event.target.value);
    };

    const autoResize = (textarea) => {
        // const target = event.target;
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
        textarea.scrollTop = 0; // Ensure scroll position is at the top
    };

    return (
        <>
            <div className="noteItemCard" onClick={fullNoteHandler}>
                <div className="cardContentBox">
                    <div className="cardHeader">
                        <h3 className="card__title">{noteTitle.length > 50 ? noteTitle.slice(0, 90) + "..." : noteTitle}</h3>
                        <div className="headerIcons">
                            <i className="fa-solid fa-pen-to-square"></i>
                            <i className="fa-solid fa-trash-can"></i>
                        </div>
                    </div>
                    <p className="card__content">{note.description.length > 400 ? note.description.slice(0, 400) + "..." : note.description}</p>
                </div>
                <div className="card__date">{dateFormate(note.date)}</div>
                <div className="card__arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="15" width="15">
                        <path fill="#fff" d="M13.4697 17.9697C13.1768 18.2626 13.1768 18.7374 13.4697 19.0303C13.7626 19.3232 14.2374 19.3232 14.5303 19.0303L20.3232 13.2374C21.0066 12.554 21.0066 11.446 20.3232 10.7626L14.5303 4.96967C14.2374 4.67678 13.7626 4.67678 13.4697 4.96967C13.1768 5.26256 13.1768 5.73744 13.4697 6.03033L18.6893 11.25H4C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75H18.6893L13.4697 17.9697Z"></path>
                    </svg>
                </div>
            </div>
            {showPopup && (
                <div>
                    <div id="overlay"></div>
                    <div id="popup" onClick={(e) => e.stopPropagation()}>
                        <div className="closePopup" onClick={closePopupHandler}>✖</div>
                        <div className="cardHeader">
                            {/* <h2>{popupContent.title}</h2> */}
                            {/* <input className='editTitle' type="text" value={noteTitle} onChange={handleTitleChange} /> */}
                            <textarea className='editTitle' type="text" value={noteTitle} onChange={handleTitleChange} />
                            <div className="headerIcons pupupIcons">
                                <i className="fa-solid fa-check" style={{ display: noteText.trim().length > popupContent.description.length ? 'inline-block' : 'none' }}></i>
                                <i className="fa-solid fa-trash-can"></i>
                            </div>
                        </div>
                        <textarea value={noteText} onChange={handleNoteChange} className='editDescription'>{popupContent.description}</textarea>
                    </div>
                </div>
            )}
        </>
    )
}

export default NoteItem
