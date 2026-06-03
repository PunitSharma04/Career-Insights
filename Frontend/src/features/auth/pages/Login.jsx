import React from 'react'
import "../auth.style.scss"
import {  Link } from 'react-router'
import  {useAuth}  from '../hooks/useAuth.js'
import {useState} from "react"
import { useNavigate } from 'react-router'


const Login = () => {
 

    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const {handleLogin, loading} = useAuth();
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleLogin({identifier, password});
        navigate("/");
    }

    

    return (
        <main>
            
            <div className="form-container">
                <h2>Login</h2>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="identifier">Username</label>
                        <input type="text" id="identifier" placeholder="Enter your username/email" onChange={(e) => setIdentifier(e.target.value)} value={identifier} />
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
