import React from 'react';
import { Link } from 'react-router-dom'

const Landing = () => {
    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
            <h1>Welcome to Coder's Lane!</h1>
            <h3>Find programmers that have the same coding interests as you!</h3>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
        </div>
    )
}

export default Landing;