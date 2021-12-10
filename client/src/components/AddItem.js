import React, { useState } from "react";
import axios from 'axios';

// import the service file since we need it to send (and get) the data to(from) the server
import service from "../cloudinary/service";

function AddItem (){
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("")
  const [imageUrl, setImageUrl] = useState("");

  const handleFileUpload = (e) => {
    console.log('The file to be uploaded is: ', e.target.files[0]);

    const uploadData = new FormData();

    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    uploadData.append('imageUrl', e.target.files[0]);

    service
      .uploadImage(uploadData)
      .then((response) => {
        // console.log("response is: ", response);
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

      .then((response) => {})

      .catch((err) => console.log(err));
  };

//   //here starts J code
//   const handleUpload = (file) => {
//     return axios
//       .post('/upload', file)
//       .then((res) => res.data)

//       .catch((err) => console.log(err));
//   };


//   const handleFileUpload = (e) => {
//     // const uploadData = new FormData()
//     console.log('The file to be uploaded is: ', e.target.files[0]);

//     const uploadData = new FormData();

//     uploadData.append('imageURL', e.target.files[0]);

//     console.log('the data', uploadData);

//     handleUpload(uploadData)
//       .then((response) => {
//         console.log('response:', response);
//         setImageUrl(response.secure_url);
//       })
//       .catch((err) => console.log('Error when uploading the file: ', err));
//   };


//   const handleSubmit = e => {

//     e.preventDefault()

//     const requestBody = { title, imageUrl, description }

//  console.log('req', requestBody)
//       axios.post('/items', requestBody)
      
//         .then(response => {

//         })

//         .catch(err => console.log(err))

  
// }


  // here ends J code

  
  // ******** this method handles just the file upload ********
//   const handleFileUpload = e => {
//     console.log("The file to be uploaded is: ", e.target.files[0]);

//     const uploadData = new FormData();

//     // imageUrl => this name has to be the same as in the model since we pass
//     // req.body to .create() method when creating a new movie in '/api/movies' POST route
//     uploadData.append("imageUrl", e.target.files[0]);

//     service
//       .uploadImage(uploadData)
//       .then(response => {
//         // console.log("response is: ", response);
//         // response carries "secure_url" which we can use to update the state
//         setImageUrl(response.secure_url);
//       })
//       .catch(err => console.log("Error while uploading the file: ", err));
//   };

  // this method submits the form
//   const handleSubmit = e => {
//     e.preventDefault();

//     service
//       .createItem({ title, imageUrl, description })
//       .then(res => {
//         // console.log("added new movie: ", res);

//         // Reset the form
//         setTitle("");
//         setDescription("");
//         setImageUrl("");
      
//         // here you would redirect to some other page      
//       })
//       .catch(err => console.log("Error while adding the new item: ", err));
//   };

  return (
    <div>
      <h2>New Item</h2>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input 
          type="text" 
          name="title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description</label>
        <textarea 
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)} 
        />

        <label>Address</label>
        <input
        type="text"
        name="address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        />
        <input
          name="imageUrl"
          type="file"
          onChange={handleFileUpload}
        />
        <button type="submit">add item</button>
      </form>
    </div>
  );
}

export default AddItem;
