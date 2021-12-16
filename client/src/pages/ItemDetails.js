import React  from 'react'
import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Button from '../components/Button'


export default function ItemDetails() {

    const [item, setItem] = useState(null)
    const [message, setMessage] = useState('')
    const [posts, setPosts] = useState([])
    
    let navigate = useNavigate();
    console.log(posts)
    const { id } = useParams()
    console.log('this is item id', id)

    useEffect(() => {
        axios.get(`/api/items/${id}`)
            .then(response => {

                setItem(response.data)
            })
            .catch(err => console.log(err))
    }, [id])



    const handleDelete = () => {
        
        axios.delete(`/api/items/${id}`)
            .then(() => {
                navigate('/items')
            })
            .catch(err => console.log(err))
    }


    const handleMessageSubmit = (e) => {
        e.preventDefault()
        axios.post(`/api/items/${id}/post`, { message })
            .then((response) => {
                // console.log("response:", response)
                setPosts(response.data.post)
                // console.log('this is response data:', response.data)
                setMessage('')
                axios.get(`/api/items/${id}`)
                .then(response => {
    
                    setItem(response.data)
                })
                .catch(err => console.log(err))
            })
    }


    return (
        <>
            {item && (
                <div className="item-detail-container">
                    <Link to={'/items'} style={{ textDecoration: 'none' }}><p> &larr; Back to items</p></Link>
                    <div >
                        <div>
                            <h1>{item.title}</h1>
                        </div>
                        <div>
                            <p className='item-detail-item'>{item.description}</p>
                        </div>
                        <div>
                            <img src={item.imageUrl} alt={item.title} width="500px" />
                        </div>

                        <div>
                            <p> Created by {item.author.name}</p>
                        </div>
                        <div>
                            <p className='item-detail-item'>{item.address}</p>
                        </div>
                        <div className='Buttons'>
                            <div className='button1'>

                            
                                <Link style={{ textDecoration: 'none' }} to={`/items/edit/${item._id}`}>
                                    <Button> Edit item </Button>
                                </Link>
                            </div>
                            <div className='button1'>

                                <button className='button-84' onClick={handleDelete}> Delete item </button>

                            </div>
                        </div>
                    </div>


                </div>

            )}
            <div className='comment-section'>
                <form onSubmit={handleMessageSubmit}>
                <div>
                <div className="text-button-align">
                    <textarea
                        className='comment-text-area'
                        cols="40"
                        rows="3"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    </div>
                    <div>
                    <button className="comment-submit-btn" type="submit">Send</button>
                    </div>
                 </div>  
                </form>

                {item && item.post.map(post => 
                <div className='comment'>
                <p> {post.message} </p>  
                </div>)}

            </div>
        </>
    )
}