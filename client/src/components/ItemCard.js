import React from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'

export default function ItemCard({ title, description, address, imageUrl, _id }) {
    return (


        <div className="item-container">

            <div>
                <h3 className="item-title">{title}</h3>
                </div>
                <div>
                <img src={imageUrl} alt="pic" width="250px" />
                </div>
                <div>
                <p>{description}</p>
                </div>
                <div>
                <p>{address}</p>
                </div>
                <Link style={{textDecoration:'none'}} to={`/items/${_id}`}>
                <Button> More info </Button>
                   {/* <button>More info</button> */}
                </Link>
            
        </div>
    )
}