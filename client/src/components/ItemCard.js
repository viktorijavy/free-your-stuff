import React from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'

export default function ItemCard({ title, address, imageUrl, _id }) {
    return (

        <div className="item-container">

            <div>
                <h2 className="item-title">{title}</h2>
            </div>

            <div>
                <img src={imageUrl} alt="pic" width="250px" />
            </div>
            <div>
                <p>{address}</p>
            </div>
            <Link style={{ textDecoration: 'none' }} to={`/items/${_id}`}>
                <Button> More info </Button>
            </Link>

        </div>
    )
}