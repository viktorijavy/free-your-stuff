import './App.css';
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { useState } from 'react'
import Home from './pages/Home'
import Items from './pages/Items'
import AddItem from "./pages/AddItem"
import ItemDetails from "./pages/ItemDetails"
import EditItem from './pages/EditItem'
import ProtectedRoute from './components/ProtectedRoute'


function App (props) {

  const [user, setUser] = useState(props.user)

  const addUser = user => {

    setUser(user);
  }


  return (
    <div className="App">

      <Navbar user={user} setUser={addUser}/>
      
      
       <Routes>
       <Route path='/' element={<Home />} />
       <Route path='/signup' element={<Signup user={user}/>}/>
       <Route path='/items/:id' element={<ItemDetails/>} />
      
       <Route path='/items/edit/:id' element={<EditItem/>} />
       <Route path="/items/add" element={<AddItem/>} />
       <Route path='/login' element={<Login user={user} setUser={addUser}/>} />

       {/* <Route path='/items' element={<Items user={user}/>} /> */}

       <Route
          path='/items'
          element={
            <ProtectedRoute redirectTo='/login' user={user}>
              <Items />
            </ProtectedRoute>
          }
        />


       </Routes>
    </div>
  );
}

export default App;
