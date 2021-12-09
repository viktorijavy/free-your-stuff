import { useState } from 'react'
import axios from 'axios';
// import { login } from '../services/auth';
import { useNavigate } from 'react-router-dom'
import Items from './Items'


export default function Login(props) {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault();

        axios.post('/auth/login', { email, name, password })
            .then(response => {
                console.log(response)
                if (response.message) {
                    // reset the form 
                    setEmail('');
                    setName('');
                    setPassword('');


                } else {
                    // return response.data;
                   
                    navigate('/items')
                }
            })
            .catch(err => {
                console.log(err)
                setMessage(err.response.data.message);
            });

            

    }
    
    return (
        <>
            <h3>Login</h3>
            <form onSubmit={handleSubmit}>

                <label htmlFor="email">Email: </label>
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />


                <label htmlFor="name">Name: </label>
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <label htmlFor="password">Password: </label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button type="submit">Log in 🔑</button>

            </form>
            {message && <p>{message}</p>}
        </>
    )
}
