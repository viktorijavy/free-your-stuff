import React from 'react'
import { useState, useEffect } from "react";

import ItemCard from '../components/ItemCard';
import axios from "axios";


export default function Items() {


  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('')

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
  }

  let filteredList = items.filter(item => {
    return (item.title.toLowerCase()).includes(search.toLocaleLowerCase())
  })

  const getAllItems = () => {
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
 <div className="search-field">
      {/* <h1 className='all-items-h1'>All Items</h1> */}
      <input 
      type="text" 
      onChange={handleSearchChange}
      className="search-input"
      placeholder="search here for items..."  
      />
</div>

      <div className='item-container-main'>

        {filteredList.map(item => <ItemCard key={item._id} {...item} />)}
      </div>
    </div>
  );
}
