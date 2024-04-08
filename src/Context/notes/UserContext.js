import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = (props) => {
    // const host = "http://localhost:5000";
    const host = "https://inotebook-backend-tau.vercel.app";

    const [errorMessage, setErrorMessage] = useState("An error has occurred");

    const demoUser = {
        "success": false,
        "user": {
            "_id": "----------",
            "name": "-----",
            "email": "-----@example.com",
            "gender": "----",
            "date": "--/--/--",
            "__v": "-"
        }
    }
    // const demoUser2 = {};

    const [userData, setUserData] = useState(demoUser);

    const handleError = error => {
        const errorComponent = document.getElementById("errorComponent")
        if (errorComponent) {
            errorComponent.style.display = error ? "block" : "none";
        }
    }

    const catchError = (error) => {
        handleError(true)
        if (error instanceof TypeError) {
            // This is likely a network error (e.g., internet is off) ↓
            // console.log({ "Please check your internet connection and try again." });
            setErrorMessage("Please check your internet connection and try again.");
        } else {
            // Other types of errors ↓
            // console.log('Error during fetching notes:', error.message);
            setErrorMessage('Error during fetching notes:', error.message);
        }
    }

    const getUser = async () => {
        // API Call ↓
        try {
            const response = await fetch(`${host}/api/auth/getuser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token")
                },
            });

            const user = await response.json();
            if (user.success) {
                // console.log(user)
                setUserData(user)
            }

            handleError(false)
        } catch (error) {
            // console.log(error)
            catchError(error)
        }
    }

    return (
        <UserContext.Provider value={{
            catchError,
            handleError,
            errorMessage,

            getUser,
            userData,
        }}>
            {props.children}
        </UserContext.Provider>
    )
}

// export default UserProvider