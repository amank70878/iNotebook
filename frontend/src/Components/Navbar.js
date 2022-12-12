import React from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar(props) {
  let navigate = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem('token');
    navigate("/login");
    props.showAlert("User logged out Successfully", true)
  }
  let location= useLocation();

  return (
      <>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid">
          <div className="navbar-brand">iNotebook</div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0" >
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==='/'? 'active':""}`} aria-current="page" to="/" >Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==='/about'? 'active':""}`} to="/about">About</Link>
              </li>
            </ul>
            {localStorage.getItem('token')===null ?<form className="d-flex" role="search">
                <Link className="btn btn-outline-success mx-1" to='/signup'  role="button">Sign-up</Link>
                <Link className="btn btn-outline-success mx-1" to='/login'  role="button">Login</Link>
              </form>:<Link className="btn btn-outline-success mx-1" to='/login' onClick={handleLogout} role="button">Logout</Link>}
          </div>
        </div>
      </nav>
    </>
  )
}
