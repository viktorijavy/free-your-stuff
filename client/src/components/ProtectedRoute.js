import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children, redirectTo, user }) {
	console.log("USER",user)
	if (user) {
		 return children
		
	} else {
		return <Navigate to={redirectTo} />
	}
	// return isLoggedIn ? children : <Navigate to={redirectTo} />
}