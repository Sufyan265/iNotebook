import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import NoteState from './Context/notes/NoteState';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Alert from './Components/Alert';
import { UserProvider } from './Context/notes/UserContext';

function App() {

  const [alert, setAlert] = useState(null);
  const showAlert = (type, msg) => {
    setAlert({ msg, type, })
    setTimeout(() => { setAlert(null) }, 3000)
  }
  return (
    <>
      <UserProvider>
        <NoteState>
          <Router>
            <Navbar />
            <div className="parentContainer">
              <Alert alertText={alert} />
              <Routes>
                <Route exact path="/" element={
                  <Home showAlert={showAlert} />
                } />
                <Route exact path="/about" element={
                  <About />
                } />
                <Route exact path="/login" element={
                  <Login showAlert={showAlert} />
                } />
                <Route exact path="/signup" element={
                  <Signup showAlert={showAlert} />
                } />

              </Routes>
            </div>
          </Router>
        </NoteState>
      </UserProvider>
    </>
  );
}

export default App;
