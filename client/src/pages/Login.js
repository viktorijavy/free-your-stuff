import { useState } from 'react'
import axios from 'axios';
import { login } from '../services/auth';
import { Link, useNavigate } from 'react-router-dom'


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
            if (response.message) {
                // reset the form 
                setEmail('');
                setName('');
                setPassword('');
                // set the message
                setMessage(response.message);
            } else {
			// return response.data;
            navigate('/items')}
		})
		.catch(err => {
			console.log(err)
		});
		
        // login(email ,name, password)
		// 	.then(response => {
		// 		console.log(response);
		// 		if (response.message) {
		// 			// reset the form 
        //             setEmail('');
		// 			setName('');
		// 			setPassword('');
		// 			// set the message
		// 			setMessage(response.message);
		// 		} else {
		// 			// user is correctly signed up in the backend
		// 			// add the user to the state of App.js
		// 			props.setUser(response);
		// 			// redirect to the projects overview
		// 			props.history.push('/items');
		// 		}
		// 	})
		// 	.catch(err => console.log(err));

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
		</>
	)
}
