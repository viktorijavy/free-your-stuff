import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import service from '../cloudinary/service'

export default function EditProject() {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [address, setAddress] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    const handleFileUpload = (e) => {
        console.log('The file to be uploaded is: ', e.target.files[0]);
    
        const uploadData = new FormData();
    
        // imageUrl => this name has to be the same as in the model since we pass
        // req.body to .create() method when creating a new movie in '/api/movies' POST route
        uploadData.append('imageUrl', e.target.files[0]);
    
        service
          .uploadImage(uploadData)
          .then((response) => {
            console.log("response is: ", response);
            // response carries "secure_url" which we can use to update the state
            setImageUrl(response.secure_url);
          })
          .catch((err) => console.log('Error while uploading the file: ', err));
      };

    const { id } = useParams()
    //console.log(id)

    let navigate = useNavigate();

    useEffect(() => {
        axios.get(`/api/items/${id}`)
            .then(response => {
                const { title, description, address, imageUrl } = response.data
                setTitle(title)
                setDescription(description)
                setAddress(address)
                setImageUrl(imageUrl)
            })
            .catch(err => console.log(err))
    }, [id])

    const handleSubmit = e => {
        e.preventDefault()
        const requestBody = { title, description, address, imageUrl }
        axios.put(`/api/items/${id}`, requestBody)
            .then(response => {
                // this is a redirect using react router
                navigate(`/items/${id}`)
            })
    }

    // const deleteItem = () => {
    // 	axios.delete(`/items/${id}`)
    // 		.then(() => {
    // 			// redirect to the projects list 
    // 			navigate('/items')
    // 		})
    // 		.catch(err => console.log(err))
    // }

    return (

        <div className="wrap">
            <h2 className="register-title">Update Item</h2>
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
                >  {description} </textarea>


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
                <button className="register-button" type="submit">Update item</button>
                

            </form>

        </div>
    )
}