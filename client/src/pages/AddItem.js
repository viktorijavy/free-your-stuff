import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

// import the service file since we need it to send (and get) the data to(from) the server
import {uploadImage} from "../cloudinary/service";
// import { redirect } from "express/lib/response";

function AddItem(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("")
  const [imageUrl, setImageUrl] = useState("");

  const navigate = useNavigate()

  const handleFileUpload = (e) => {
    console.log('The file to be uploaded is: ', e.target.files[0]);

    const uploadData = new FormData();

    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    uploadData.append('imageUrl', e.target.files[0]);

    uploadImage(uploadData)
      .then((response) => {
        console.log("response is: ", response);
        // response carries "secure_url" which we can use to update the state
        setImageUrl(response.secure_url);
      })
      .catch((err) => console.log('Error while uploading the file: ', err));
  };




  // this method submits the form
  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { title, description, address, imageUrl };
    console.log('the image', imageUrl);

   
    axios
      .post('/items', requestBody)
      .then(() => {

        navigate('/items')
        // props.refreshItems()

      })
      .catch((err) => console.log(err));
  };



  return (
    <div className="wrap">
      <h2 className="register-title">New Item</h2>
      <form className="register" onSubmit={handleSubmit}>

        <input
          className="register-input"
          placeholder="Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />


        <textarea
          className="register-input"
          placeholder="Add a description here"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />


        <input
          className="register-input"
          placeholder="Address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          className="register-input"
          name="imageUrl"
          type="file"
          onChange={handleFileUpload}
        />
        <button className="register-button" type="submit">Add item</button>
      </form>
    </div>
  );
}

export default AddItem;
