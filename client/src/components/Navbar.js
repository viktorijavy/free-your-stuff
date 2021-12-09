import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default function Navbar(props) {


    const handleLogout = (e) => {
        props.setUser(null)
        return axios.delete('/auth/logout')
            .then(response => {
                return response.data;
            })
            .catch(err => {
                return err.response.data;
            });
    }

    console.log('THIS IS NEW', props.user)
  

	return (
		<nav>
			{props.user ? (
				<>
					<Link to="/">
						<button>Home</button>
					</Link>
					<Link to="/items">
						<button>Items</button>
					</Link>
					<Link to="/" onClick={() => handleLogout()}>
						<button>Logout</button>
					</Link>
				</>
			) : (
				<>
					<Link to="/signup">
						<button>Signup</button>
					</Link>
					<Link to="/login">
						<button>Login</button>
					</Link>
				</>
			)}
		</nav>
	)

    // return (




    //     // <nav className="Navbar">


    //     //     <Link to='/'>
    //     //         <button>Home</button>
    //     //     </Link>


    //     //     <button>Logout</button>



    //     //     <Link to='/signup'>
    //     //         <button>Signup</button>

    //     //     </Link>


    //     //     <Link to='/login'>
    //     //         <button>Login</button>
    //     //     </Link>


    //     // </nav>


     

    // )
}
