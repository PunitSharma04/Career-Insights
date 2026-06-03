import React from 'react'
import "../auth.style.scss"
import {  Link } from 'react-router'
import  {useAuth}  from '../hooks/useAuth.js'
import {useState} from "react"
import { useNavigate } from 'react-router'


const Login = () => {
 

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {handleLogin, loading} = useAuth();
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleLogin({email, password});
        navigate("/");
    }

    

    return (
        <main>
            <div className="about-project">
                <h2>Welcome to AI Resume Analyzer</h2>
                <p> Analyze resumes, match job descriptions, identify skill gaps, and ATS-optimized resumes.</p>
            </div>
            <div className="form-container">
                <h2>Login</h2>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input type="email" id="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} value={email} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} value={password} />
                    </div>
                    <button className="button primary-button" disabled={loading} >

                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            <p>Don't have an account? <Link to={"/register"}>Register </Link></p>
            </div>

        </main>
    )
}

export default Login
