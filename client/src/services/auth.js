import axios from 'axios';

const signup = (email, name, password) => {
	return axios.post('/auth/signup', { email, name, password })
		.then(response => {
            
			return response.data;
		})
		.catch(err => {
			return err.response.data;
		});
}

const login = (email, name,  password) => {
	return axios.post('/auth/login', { email, name,  password })
		.then(response => {
			return response.data;
		})
		.catch(err => {
			return err.response.data;
		});
}

const logout = () => {
	return axios.delete('/auth/logout')
		.then(response => {
			return response.data;
		})
		.catch(err => {
			return err.response.data;
		});
}

export { signup, login, logout };