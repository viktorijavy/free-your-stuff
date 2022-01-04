import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children, redirectTo, user }) {
	
	if (user) {
		return children
		
	} else {
		return <Navigate to={redirectTo} />
	}
	
}