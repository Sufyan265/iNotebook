import React, { useContext, useEffect } from 'react'
import noteContext from '../Context/notes/noteContext';
// import NoteItem from './NoteItem'
import "./NoteItemStyle.css"
import Sidebar from "./Sidebar"
import NoteEditer from './NoteEditer'
import ErrorHandling from './ErrorHandling';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/notes/UserContext';


function Notes(props) {

    const { getNotes } = useContext(noteContext);
    const { getUser } = useContext(UserContext);


    const navigate = useNavigate();
    useEffect(() => {
        const authUser = () => {
            if (localStorage.getItem("token")) {
                getNotes();

                getUser();

            } else {
                navigate("/login")
            }
        }
        authUser();
    }, [navigate])
    return (
        <>
            <div className="wrapper d-flex align-items-stretch">
                <ErrorHandling />
                <Sidebar />

                <NoteEditer showAlert={props.showAlert} />
            </div>
        </>
    )
}

export default Notes
