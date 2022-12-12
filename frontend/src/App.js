import './App.css';
import { useState } from 'react';
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import About from './Components/About'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from './Context/notes/notestate';
import Alert from './Components/Alert';
import Login from './Components/Login';
import Signup from './Components/Signup';

function App() {

  const [alert, setAlert] = useState(null);
  const showAlert = (msg, type) => {
    console.log("alert");
    setAlert({
      msg: msg,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2500);
  };
  return (
    <>
    <NoteState>
      <Router>

        <Navbar/>
        <Alert  alert={alert} />
        
        <Routes>
          <Route exact path="/" element={<Home  showAlert={showAlert}/>} />
          <Route exact path="/about" element={<About  showAlert={showAlert}/>} />
          <Route exact path="/signup" element={<Signup  showAlert={showAlert}/>} />
          <Route exact path="/login" element={<Login  showAlert={showAlert}/>} />
        </Routes>

      </Router>
    </NoteState>
    </>
  );
}

export default App;
