import React, { useContext, useState } from 'react'
import noteContext from '../Context/notes/noteContext'
import "./sidebarStyle.css"
import NoteItem2 from './NoteItem2'

const Sidebar = () => {
    const context = useContext(noteContext)
    const { notes, addNote } = context;

    const [activeItem, setActiveItem] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCards = notes.filter(noteItem =>
        noteItem.title.toLowerCase().startsWith(searchTerm.toLowerCase())
    );

    const handleCreateNewNote = () => {
        // setNewNote({ title: "", description: "" })
        addNote();
    }

    return (
        <>
            <nav id="sidebar">
                <button className='btn btn-primary createNewBtn' onClick={handleCreateNewNote}>+ Create New</button>

                <div className="input-group listItemSreach">
                    <input type="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="form-control rounded searchBar" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                    <span className="input-group-text border-0 searchbarIcon" id="search-addon">
                        <i className="fas fa-search"></i>
                    </span>
                </div>
                <div className="listItems">

                    {filteredCards.length === 0 ? (
                        <div className="emptyList">
                            <p>No notes to preview</p>
                        </div>
                    ) : (
                        <div className="list-group">
                            {filteredCards.map((note) => {
                                return <div key={note._id}>
                                    <NoteItem2 note={note} activeItem={activeItem} setActiveItem={setActiveItem} />
                                </div>
                            })}
                        </div>
                    )}
                </div>
            </nav>

        </>
    )
}

export default Sidebar
