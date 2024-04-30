import React, { useContext, useState } from 'react'
import "./loginStyle.css"
import noteContext from '../Context/notes/noteContext';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/notes/UserContext';

const Login = (props) => {
    // const host = "http://localhost:5000";
    // const host = "https://inotebook-backend-tau.vercel.app";
    let navigate = useNavigate();
    
    const { setProgress, host } = useContext(UserContext);
    const { catchError, handleError, setNewNote } = useContext(noteContext);
    const { showAlert } = props;

    const [credentials, setCredentials] = useState({ email: "", password: "" });

    // Login user ↓
    const handleSubmit = async (event) => {
        event.preventDefault();
        // API Call ↓
        try {
            setProgress(10);
            const response = await fetch(`${host}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password }),
            });
            setProgress(40);
            const user = await response.json();
            if (user.success) {
                // console.log(user)
                // Save the auth token and redirect ↓ 
                localStorage.setItem("token", user.authToken)
                navigate("/")
                showAlert("success", "Logged in successfully");
                setProgress(80);
            } else {
                // console.log(user)
                showAlert("danger", user.error);
            }
            setNewNote({ title: "", description: "", id: "" });

            handleError(false);
            setProgress(100);
        } catch (error) {
            // console.log(error)
            catchError(error)
        }
    }

    const handleChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    }


    return (
        <>
            <div className="d-lg-flex half" id='loginPage'>
                <div className="bg order-1 order-md-2 loginPoster"></div>
                <div className="contents order-2 order-md-1">

                    <div className="container">
                        <div className="row align-items-center justify-content-center py-5">
                            <div className="col-md-7">
                                <h3>Login to <strong>iNotebook</strong></h3>
                                <p className="mb-3">Quickly save your ideas safely and in style, whenever they come to mind.</p>

                                <form action="#" method="post" onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="username">Username</label>
                                        <input type="email" className="form-control" value={credentials.email} onChange={handleChange} name='email' placeholder="your-email@example.com" id="username" autoComplete="username" required />
                                    </div>

                                    <div className="form-group my-3">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" className="form-control" value={credentials.password} onChange={handleChange} name='password' placeholder="Your Password" id="password" autoComplete="current-password" minLength={6} required />
                                    </div>

                                    {/* <div className="d-flex mb-5 align-items-center">
                                        <label className="control control--checkbox mb-0"><span className="caption">Remember me</span>
                                            <input type="checkbox" checked="checked" //>
                                            <div className="control__indicator"></div>
                                        </label>
                                        <span className="ml-auto"><a href="#" className="forgot-pass">Forgot Password</a></span>
                                    </div> */}

                                    <input type="submit" value="Log In" className="btn btn-block btn-primary" />

                                </form>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}

export default Login
