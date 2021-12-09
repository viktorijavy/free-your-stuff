import './App.css';
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { useState } from 'react'
import Home from './pages/Home'
import Items from './pages/Items'


function App(props) {

  const [user, setUser] = useState(props.user)

  const addUser = user => {
    setUser(user);
  }


  return (
    <div className="App">
      <header className="App-header">

      <Navbar user={user} setUser={addUser}/>
       <h1>Welcome to free your stuff</h1> 

       <Routes>
       <Route path='/' element={<Home />} />
       <Route path='/signup' element={<Signup user={user}/>} />
       {/* <Route
          path="/signup"
          element={props => <Signup setUser={addUser} {...props} />}
        /> */}
       
       <Route path='/login' element={<Login user={user} setUser={addUser}/>} />
       <Route path='/items' element={<Items user={user}/>} />


       </Routes>
      </header>
    </div>
  );
}

export default App;
