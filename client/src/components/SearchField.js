import React from 'react'

export default function SearchField(props) {

    const handleSearchChange = event => {
        props.setQueryProp(event.target.value)
    }
    return (
        <div>
            <input className="input" type="text"  onChange={handleSearchChange}/>
        </div>
    )
}
