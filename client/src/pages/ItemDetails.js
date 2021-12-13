import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import Button from '../components/Button'

export default function ItemDetails() {

    const [item, setItem] = useState(null)

    const { id } = useParams()
    console.log(id)

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
                    <h1>Details</h1>
                    <div >
                        <div>
                            <h3>{item.title}</h3>
                        </div>
                        <div>
                            <p>{item.description}</p>
                        </div>
                        <div>
                            <img src={item.imageUrl} alt={item.title} width="500px" />
                        </div>
                        <div>
                            <p>{item.address}</p>
                        </div>
                        <div className='Buttons'>
                            <div className='button1'>
                                <Link style={{ textDecoration: 'none' }} to={`/items/edit/${item._id}`}>
                                    <Button> Edit item </Button>
                                </Link>
                            </div>
                            <div className='button1'>
                                
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}