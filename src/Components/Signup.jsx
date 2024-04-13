import React, { useContext, useState } from 'react'
import "./loginStyle.css"
import noteContext from '../Context/notes/noteContext';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/notes/UserContext';

// import { FaExclamationCircle } from 'react-icons/fa';

const Login = (props) => {
    // const host = "http://localhost:5000";
    const host = "https://inotebook-backend-tau.vercel.app";

    let navigate = useNavigate();

    const { setProgress } = useContext(UserContext);
    const context = useContext(noteContext)
    const { catchError, handleError, } = context;
    const { showAlert } = props;

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cPassword: "", gender: "" });

    const [paswwordError, setPaswwordError] = useState(false);

    // Login user ↓
    const handleSubmit = async (e) => {
        e.preventDefault();
        const genderValue = credentials.gender === "" ? "Unset" : credentials.gender;
        // API Call ↓
        try {
            setProgress(10);
            const response = await fetch(`${host}/api/auth/createuser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, gender: genderValue }),
            });
            setProgress(40);
            const user = await response.json();
            if (credentials.password !== credentials.cPassword || credentials.cPassword !== credentials.password) {
                // setPaswwordError(credentials.password !== credentials.cPassword);
                setProgress(100);
                return setPaswwordError(true)
            }
            // else if (name === 'cPassword') {
            //     setPaswwordError(value !== credentials.password);
            // }

            if (user.success) {
                // Save the auth token and redirect ↓ 
                localStorage.setItem("token", user.authToken)
                navigate("/")
                // navigate("/login");
                showAlert("success", "Account created successfuly");
                setProgress(80);
            } else {
                // console.log(user)
                if (user.alreadyExist) {
                    showAlert("warning", user.error);
                    setProgress(100);
                    return navigate("/login")
                }
                showAlert("danger", user.error);
            }

            handleError(false)
            setProgress(100);
        } catch (error) {
            // console.log(error)e
            catchError(error)
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCredentials({ ...credentials, [name]: value });

        if (name === 'password') {
            setPaswwordError(value !== credentials.cPassword);
        } else if (name === 'cPassword') {
            setPaswwordError(value !== credentials.password);
        }
    }

    return (
        <>
            <div className="d-lg-flex half" id='loginPage'>
                <div className="bg order-1 order-md-2 loginPoster"></div>
                <div className="contents order-2 order-md-1">

                    <div className="container">
                        <div className="row align-items-center justify-content-center py-5">
                            <div className="col-md-7">
                                <h3>Signup to <strong>iNotebook</strong></h3>
                                <p className="mb-1">Securely store your notes in the cloud for easy access from anywhere.</p>
                                <form action="#" method="post" onSubmit={handleSubmit}>

                                    <label className='mt-3' htmlFor="name">Name</label>
                                    <input type="text" className="form-control" value={credentials.name} onChange={handleChange} name='name' placeholder="Full Name..." id="name" autoComplete="off" required />

                                    <label className='mt-3' htmlFor="username">Username</label>
                                    <input type="email" className="form-control" value={credentials.email} onChange={handleChange} name='email' placeholder="your-email@example.com" id="username" autoComplete="off" required />

                                    <label className='mt-3' htmlFor="password">Password</label>
                                    <input type="password" className="form-control" value={credentials.password} onChange={handleChange} name='password' placeholder="Your Password" id="password" autoComplete="off" minLength={6} required />

                                    <label className='mt-3' htmlFor="cPassword">Confirm Password</label>
                                    <input type="password" className="form-control" value={credentials.cPassword} onChange={handleChange} name='cPassword' placeholder="Confirm Password" id="cPassword" autoComplete="off" minLength={6} required />
                                    {paswwordError && (
                                        <div className='passwordError mt-2'>
                                            <span>
                                                <i className="fa-solid fa-circle-exclamation"></i>
                                            </span>
                                            <p>Passwords do not match</p>
                                        </div>
                                    )}

                                    <div id="gender" className='py-3'>
                                        <input type="radio" id="male" name="gender" value="Male" onChange={handleChange} />
                                        <label htmlFor="male">Male</label>
                                        <input type="radio" id="female" name="gender" value="Female" onChange={handleChange} />
                                        <label htmlFor="female">Female</label>
                                        <input type="radio" id="other" name="gender" value="Other" onChange={handleChange} />
                                        <label htmlFor="other">Other</label>
                                    </div>

                                    {/* <div className="d-flex mb-5 align-items-center">
                                        <label className="control control--checkbox mb-0"><span className="caption">Remember me</span>
                                            <input type="checkbox" checked="checked" />
                                            <div className="control__indicator"></div>
                                        </label>
                                        <span className="ml-auto"><a href="#" className="forgot-pass">Forgot Password</a></span>
                                    </div> */}

                                    <input type="submit" value="Sign Up" className="btn btn-block btn-primary" />

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
