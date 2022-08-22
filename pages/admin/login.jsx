import { useRouter } from 'next/router';
import React, { useState } from 'react';
import classes from '../../styles/Login.module.scss';
import axios from 'axios';

const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)

    const router = useRouter()

    const handleUsername = e => {
        setUsername(e.target.value)
    }

    const handlePassword = e => {
        setPassword(e.target.value)
    }

    const handleLogin = async () => {
        try {
            await axios.post("http://localhost:3000/api/auth", { username, password })
            router.replace("/admin")
        } catch (e) {
            setError(true)
            setPassword('')
        }
    }

    return (
        <div className={classes.login}>
            <div className={classes.login__wrapper}>
                <h1>Admin Dashboard</h1>
                <input 
                    type="text" 
                    placeholder="username"
                    className={classes.login__input}
                    value={username}
                    onChange={handleUsername}
                />
                <input 
                    type="password" 
                    placeholder="password"
                    className={classes.login__input}
                    value={password}
                    onChange={handlePassword}
                />
                <button
                    onClick={handleLogin}
                    className={classes.login__button}    
                >Sign In</button>
                {error && <span className={classes.login__error}>Wrong Username or Password!</span>}
            </div>
        </div>
    );
};

export default Login;