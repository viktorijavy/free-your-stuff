import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import { signup } from '../services/auth';

export default function Signup(props) {

    const [email, setEmail] = useState('')
	const [name, setName] = useState('')
	const [password, setPassword] = useState('')
    const [message, setMessage] = useState('');

    const navigate = useNavigate()

	const handleEmail = e => setEmail(e.target.value)
	const handleName = e => setName(e.target.value)
	const handlePassword = e => setPassword(e.target.value)


    const handleSubmit = e => {
		e.preventDefault()
		const requestBody = { email, name, password}

		axios.post('/auth/signup', requestBody)
			.then(response => {
				// redirect -> login 
				navigate('/login')
			})
			.catch(err => {
				const errorDescrition = err.response.data.message
				setMessage(errorDescrition)
			})


        // signup(email, name, password)
		// 	.then(response => {
		// 		//console.log(response);
		// 		if (response.message) {
		// 			// reset the form 
        //             setEmail('')
		// 			setName('');
		// 			setPassword('');
		// 			// set the message
		// 			setMessage(response.message);
		// 		} else {
		// 			// user is correctly signed up in the backend
		// 			// add the user to the state of App.js
		// 			props.setUser(response);
		// 			// redirect to the projects overview
		// 			props.history.push('/login');
		// 		}
		// 	})
		// 	.catch(err => console.log(err));
	}

    return (
        <div>
			<h1>Signup</h1>
			<form onSubmit={handleSubmit}>
				<label>Email: </label>
				<input type="email" name="email" value={email} onChange={handleEmail} />
				<label>Name: </label>
				<input type="text" value={name} onChange={handleName} />
                <label>Password: </label>
				<input type="password" value={password} onChange={handlePassword} />

				<button type="submit">Sign Up</button>
			</form>

			{message && <p>{setMessage}</p>}

			<p>Already have an account?</p>
			<Link to='/login'>Login</Link>
		</div>
    )
}
