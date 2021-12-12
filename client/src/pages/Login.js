import { useState } from 'react'
import axios from 'axios';
// import { login } from '../services/auth';
import { useNavigate } from 'react-router-dom'
// import Items from './Items'


export default function Login(props) {
    const [email, setEmail] = useState('')
    // const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault();

        axios.post('/auth/login', { email, password })
            .then(response => {
                console.log('response when log-in', response)
                if (response.message) {
                    // reset the form 
                    setEmail('');
                    setPassword('');


                } else {
                    // return response.data;
                   props.setUser(response.data)
                    navigate('/items')
                }
            })
            .catch(err => {
                console.log(err)
                setMessage(err.response.data.message);
            });

            

    }
    
    return (
        <div className="wrap">
            <h3 className="register-title">Login</h3>
            <form className="register" onSubmit={handleSubmit}>

                
                <input
                    type="email"
                    placeholder="Email address"
                    className="register-input"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                
                <input
                    type="password"
                    placeholder="Password"
                    className="register-input"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button  className="register-button"type="submit">Log in 🔑</button>

            </form>
            {message && <p>{message}</p>}
        </div>
    )
}
