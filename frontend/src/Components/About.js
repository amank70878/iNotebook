import React from 'react'

const About = () => {
  return (
    <>
    {localStorage.getItem('token')!==null ? <div className="container text-center my-5 h2" >About</div> : <h1 className="container text-center my-5">please logged in with your credentials</h1>}

  

    </>
  )
}

export default About