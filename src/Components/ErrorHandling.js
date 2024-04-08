import React, { useContext } from 'react'
import errorIcon from "./Images/Error icon.png"
import noteContext from '../Context/notes/noteContext';

// useEffect(()=> {
//     document.getElementById("errorComponent").style.display = "none";
// })

const ErrorHandling = () => {
    const context = useContext(noteContext)
    const { errorMessage } = context;
    return (
        <>
            <div id='errorComponent'>
                <div className="errorHandling">
                    <img src={errorIcon} alt="" />
                    <p>{errorMessage}</p>
                </div>
            </div>

        </>
    )
}

export default ErrorHandling
