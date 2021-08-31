import React from 'react'
import styles from './Avatar.module.css'

const Avatar = ({ onClick }) => {
    return (
        <div>
            <h1>Avatar Component</h1>
            <button onClick={onClick}>Next</button>
        </div>
    )
}

export default Avatar
