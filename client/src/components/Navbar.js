import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default function Navbar(props) {


    const handleLogout = (e) => {
        
        return axios.delete('/auth/logout')
            .then(response => {
				console.log('response when log out', response)
                
              props.setUser(null)
				return response.data;
            })
            .catch(err => {
                return err.response.data;
            });
    }

    console.log('logging props.user', props.user)
  

	return (
		<nav className='topnav'>
			{props.user ? (
				<>
					<Link to="/">
						<p>Home</p>
					</Link>
					<Link to="/items">
						<p>Items</p>
					</Link>
					<Link to="/" onClick={() => handleLogout()}>
						<p className='logout'>Logout</p>
					</Link>

					<Link to="/items/add"><p>Add new item</p></Link>
				</>
			) : (
				<>
					<Link to="/signup">
						<p>Signup</p>
					</Link>
					<Link to="/login">
						<p>Login</p>
					</Link>
				</>
			)}
		</nav>
	)

   
}
