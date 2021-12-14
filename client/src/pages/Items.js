import React from 'react'
import { useState, useEffect } from "react";

import ItemCard from '../components/ItemCard';
import axios from "axios";
// import AddItem from './AddItem';




export default function Items() {

  
    const [items, setItems] = useState([]);



  const getAllItems = () => {
		// request all the projects from the server
		axios.get('/items')
			.then(response => {
				console.log('this is response from getAllItems', response)
				setItems(response.data)
			})
			.catch(err => console.log(err))
	}

	useEffect(() => {
		getAllItems()
	}, [])

  return (
    <div>
    
    {/* <AddItem refreshItems={getAllItems}/> */}
    
      <h1 className='all-items-h1'>All Items</h1>

      {/* {items.map((item) => (
        <div key={item._id}>
          <h2>{item.title}</h2>
          <img src={item.imageUrl} alt="" width="200"/>
          <p>{item.description}</p>
          <p>{item.address}</p>
        </div>
      ))} */}
      <div className='item-container-main'>

      {items.map(item => <ItemCard key={item._id} {...item} />)}
</div>
    </div>
  );
}
