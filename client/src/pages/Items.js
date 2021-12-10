import React from 'react'
import { useState, useEffect } from "react";
import service from "../cloudinary/service"
import AddItem from '../components/AddItem'
// import axios from "axios";
// import { Link } from "react-router-dom";



export default function Items() {
    const [items, setItems] = useState([]);

  // When the component mounts we run an effect to get a list of movies from the server
  useEffect(() => {
    service
      .getItems()
      .then((data) => {
        
        setItems(data);
      })
      .catch((err) => console.log(err));
  }, []); //  <-- This effect will run only once after the initial render

  return (
    <div>
    <AddItem/>
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
