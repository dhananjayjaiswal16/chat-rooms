import React from 'react'
import styles from './Name.module.css'

const Name = ({ onClick }) => {
    return (
        <div>
            <h1>Name Component</h1>
            <button onClick={onClick}>Next</button>
        </div>
    )
}

export default Name;