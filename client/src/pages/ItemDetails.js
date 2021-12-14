import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Button from '../components/Button'

export default function ItemDetails() {

    let navigate = useNavigate();

    const handleDelete = () => {
		axios.delete(`/items/${id}`)
			.then(() => {
				// redirect to the projects list 
				navigate('/items')
			})
			.catch(err => console.log(err))
	}

    const [item, setItem] = useState(null)

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
                <Link to={'/items'}><p>  Back to items</p></Link>
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
                            {/* <p>{item.author._id}</p> */}
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
                            {/* <Link style={{ textDecoration: 'none' }} to={`/items/edit/${item._id}`}></Link> */}
                                    <button className='button-84' onClick={handleDelete}> Delete item </button>
                                
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}