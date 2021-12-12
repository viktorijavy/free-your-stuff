import React from 'react'
import { useState, useEffect } from "react";
// import service from "../cloudinary/service"
// import AddItem from './AddItem'
import axios from "axios";
// import { Link } from "react-router-dom";



export default function Items() {
    const [items, setItems] = useState([]);



  const getAllItems = () => {
		// request all the projects from the server
		axios.get('/items')
			.then(response => {
				console.log(response)
				setItems(response.data)
			})
			.catch(err => console.log(err))
	}

	useEffect(() => {
		getAllItems()
	}, [])

  return (
    <div>
    <div>
    {/* <AddItem refreshItems={getAllItems}/> */}
    </div>
      <h2>All Items</h2>

      {items.map((item) => (
        <div key={item._id}>
          <h2>{item.title}</h2>
          <img src={item.imageUrl} alt="" width="200"/>
          <p>{item.description}</p>
          <p>{item.address}</p>
        </div>
      ))}
    </div>
  );
}
