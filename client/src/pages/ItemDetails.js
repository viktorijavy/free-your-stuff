import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Button from '../components/Button'

export default function ItemDetails() {

    const [item, setItem] = useState(null)
    const [message, setMessage] = useState('')
    const [posts, setPosts] = useState([])

    let navigate = useNavigate();

    const handleDelete = () => {
        axios.delete(`/items/${id}`)
            .then(() => {
                // redirect to the projects list 
                navigate('/items')
            })
            .catch(err => console.log(err))
    }

  const handleMessageSubmit = () => {
      axios.post(`/items/${id}/post`, {message})
      .then((response) => {
          console.log("response:", response)
          setPosts(response.data.post)
          setMessage('')
        //   navigate(`/items/${id}`)
      })
  }

    const { id } = useParams()
    console.log('this is item id', id)

    useEffect(() => {
        axios.get(`/items/${id}`)
            .then(response => {

                setItem(response.data)
            })
            .catch(err => console.log(err))
    }, [id])



    return (
        <>
            {item && (
                <div className="item-detail-container">
                    <Link to={'/items'}><p> Back to items</p></Link>
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

            <form onSubmit={handleMessageSubmit}>
                <textarea
                    cols="30"
                    rows="3"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit">Send</button>
            </form>
            
            {posts.map(post => {
                return <p>{post.message}</p>
            })}
        </>
    )
}