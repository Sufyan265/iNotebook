import React, { useContext, useEffect } from 'react'
import { UserContext } from '../Context/notes/UserContext';
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

import maleProfileLogo from "./Images/male-avatar.svg";
import femaleProfileLogo from "./Images/female-avatar.svg";
import noteContext from '../Context/notes/noteContext';

const Navbar = () => {
    const context = useContext(UserContext)
    const { userData, progress } = context;
    const navigate = useNavigate();

    const { setNewNote } = useContext(noteContext);

    let location = useLocation();
    const handleListToggle = () => {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            sidebar.classList.toggle('active')
            if (window.innerWidth < 991) {
                document.querySelector(".overlay").classList.toggle('overlayActive')
            }
        }
    }
    
    const token = localStorage.getItem("token");
    useEffect(() => {
        // Initialize tooltips
        const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        tooltips.forEach((tooltip) => {
            new window.bootstrap.Tooltip(tooltip);
        });

        const handlePageClick = (e) => {
            const profileContent = document.getElementById("profileContent");
            const profileBox = document.querySelector('.profileBox');
            if (profileContent && profileBox && !profileContent.contains(e.target) && !profileBox.contains(e.target)) {
                profileContent.classList.remove("show");
            }
        };
        document.addEventListener('click', handlePageClick);
        return () => document.removeEventListener('click', handlePageClick);

    }, [token]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login")
        setNewNote({ title: "", description: "" })
    }

    const toggleProfile = () => {
        const profileContent = document.getElementById("profileContent");
        profileContent.classList.toggle("show");
    }

    return (
        <>
            <LoadingBar color='#6eefcb' progress={progress} height={3} />
            <nav className="navbar navbar-expand-lg navbarStyle" style={{ backgroundColor: "rgb(243 163 48)" }} data-bs-theme="dark">
                <div className="container-fluid">
                    <span className='listItemToggle' onClick={handleListToggle} >
                        <i className="fa-solid fa-bars-staggered"></i>
                    </span>

                    <Link className="navbar-brand" to="/">iNotebook</Link>
                    <button className="navbar-toggler" id='navbarToggler' type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''} disabled`} to="/about">About</Link>
                            </li>
                        </ul>
                        {/* <form className="d-flex" role="search" data-bs-theme="light">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-secondary" type="submit">Search</button>
                        </form> */}

                        {/* <span className='cloudSave' data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="All changes saved">
                            <img src={cloudIcon} alt="" />
                        </span> */}
                        {!localStorage.getItem("token") ? (
                            <>
                                <Link className="btn btn-dark mx-2 loginBtn" to="/login" role="button">Login</Link>
                                <Link className="btn btn-dark mx-2 loginBtn" to="/signup" role="button">Signup</Link>
                            </>
                        ) : (
                            <>
                                {/* <button className='btn btn-dark mx-2 loginBtn' role="button">Logout →</button> */}
                                <div className="profileBox rounded-pill" onClick={(e) => toggleProfile(e)}>
                                    <span className='profileIcon' data-bs-placement="left" data-bs-toggle="tooltip" data-bs-title="Profile">
                                        <img src={userData.user.gender === "Female" ? femaleProfileLogo : maleProfileLogo} alt="" />
                                    </span>
                                    <div className="profile-content" id="profileContent" onClick={(e) => e.stopPropagation()}>
                                        <p>{userData.user.name.length > 50 ? userData.user.name.slice(0, 50) + "..." : userData.user.name}</p>
                                        <button className="logout-btn loginBtn" onClick={handleLogout}><i className="fa-solid fa-arrow-right-from-bracket"></i> Logout</button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </nav>

        </>
    )
}

export default Navbar
