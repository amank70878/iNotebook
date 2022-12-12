import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
  name: "sdaadawd",
  email: "ajsdha@gmail.com",
  password: "12345",
  cpassword: "12345",
  });
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch(`http://localhost:5000/api/auth/Createuser`, {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();

    if (json.success) {
      localStorage.setItem("token", json.authToken);
      navigate('/login');
      props.showAlert("Account Created Successfully , now you have loggedin", true);
    } else {
      props.showAlert("Invalid Details", false);
    }
  };

  const onchange = (e) => {
  setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
return (
<>
  <form className="container my-5" onSubmit={handleSubmit}>
    <h1 className="my-2">Create an Account to use the iNotebook</h1>

    <div className="mb-3">
      <label htmlFor="name" className="form-label">
        Name
      </label>
      <input type="text" className="form-control" name="name" required minLength={3} onChange={onchange} />
    </div>

    <div className="mb-3">
      <label htmlFor="email" className="form-label">
        Email address
      </label>
      <input type="email" className="form-control" name="email" aria-describedby="emailHelp" onChange={onchange} />
      <div id="emailHelp" className="form-text">
        We'll never share your email with anyone else.
      </div>
    </div>

    <div className="mb-3">
      <label htmlFor="password" className="form-label">
        Password
      </label>
      <input type="password" className="form-control" name="password" required minLength={5} onChange={onchange} />
    </div>

    <div className="mb-3">
      <label htmlFor="cpassword" className="form-label">
        Confirm Password
      </label>
      <input type="password" className="form-control" name="cpassword" required minLength={5} onChange={onchange} />
    </div>

    <button type="submit" className="btn btn-success">
      Submit
    </button>
  </form>
</>
);
};

export default Signup;