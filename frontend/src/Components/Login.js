import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  
  const [credentials, setCredentials] = useState({
    email: "ajsdha@gmail.com",
    password: "12345",
    });
    const navigate = useNavigate()
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const { email, password } = credentials;
      const response = await fetch(`http://localhost:5000/api/auth/login`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const json = await response.json();
  
      if (json.success) {
        localStorage.setItem("token", json.authToken);
        navigate('/');
        props.showAlert("logged in Successfully", true);
      } else {
        props.showAlert("Inavlid Credentails", false);
      }
    };
  
    const onchange = (e) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };


  return (
      <form className='container mt-5' onSubmit={handleSubmit}>
        <h1 className='my-2'>Login with your valid Credentials</h1>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email"aria-describedby="emailHelp" required onChange={onchange} />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" required minLength={5} onChange={onchange}/>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
}

export default Login