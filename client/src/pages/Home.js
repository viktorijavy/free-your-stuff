import React from 'react'

export default function Home() {
    return (
        <div>
            <div className='home-container'>
                <img className='home-pic' src={'https://images.unsplash.com/photo-1445510861639-5651173bc5d5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1659&q=80'} alt="pic" />
                <div class="centered">
                     <h1 className="home-page-h1">Welcome to furniture exchange</h1>
                       <p className='home-page-p'>Here is some explanation about the website, maybe some stupid quote</p>

                </div>
            </div>
        </div>
    )
}
