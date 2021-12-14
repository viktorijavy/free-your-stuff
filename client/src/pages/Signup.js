import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

// import { signup } from '../services/auth';

export default function Signup() {

	const [email, setEmail] = useState('')
	const [name, setName] = useState('')
	const [password, setPassword] = useState('')
	const [errorMessage, setErrorMessage] = useState(undefined)

	const navigate = useNavigate()

	const handleEmail = e => setEmail(e.target.value)
	const handleName = e => setName(e.target.value)
	const handlePassword = e => setPassword(e.target.value)

	const handleSubmit = e => {
		e.preventDefault()
		const requestBody = { email, password, name }

		axios.post('/auth/signup', requestBody)
			.then(response => {
				 
				navigate('/login')
			})
			.catch(error => {
				const errorDescription = error.response.data.message
				setErrorMessage(errorDescription)
			})
	}

	return (
		<div className="wrap">
			<h1 className="register-title">Signup</h1>
			<form className="register" onSubmit={handleSubmit}>
				
				<input 
				className="register-input" 
				placeholder="Email address" 
				type="email" 
				value={email} 
				onChange={handleEmail} />
				
				<input 
				className="register-input" 
				type="text" 
				placeholder="Name" 
				value={name} 
				onChange={handleName} />
				
				<input 
				className="register-input" 
				type="password" 
				value={password} 
				placeholder="Password" 
				onChange={handlePassword} />

				<button type="submit" className="register-button">Create an account</button>
			</form>

			{errorMessage && <p className='error-message'>{errorMessage}</p>}

			<p className='signup-p'>Already have an account?</p>
			
			<Link to='/login'><p className='signup-p'>Login</p></Link>
		</div>
	)
}
