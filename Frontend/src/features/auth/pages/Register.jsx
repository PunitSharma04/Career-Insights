import React from 'react'
import {Link} from "react-router"
import {useAuth} from "../hooks/useAuth.js"
import { useState } from 'react'
import { useNavigate } from 'react-router'
const Register = () => {
    const {loading , handleRegister} = useAuth();
    const navigate = useNavigate();
    const[username, setUsername] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!username || !password || !email){
            alert('All fields are required')
        }
        await handleRegister({username, email, password});
        navigate("/");
    }
  return (
    <main>
            
            <div className="form-container">
                <h2>Register</h2>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button className="button primary-button" disabled={loading}>
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>
                <p>Already have an account? <Link to="/login">Login </Link></p>
            </div>

        </main>
  )
}

export default Register
