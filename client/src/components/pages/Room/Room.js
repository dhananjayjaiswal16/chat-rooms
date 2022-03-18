import React, { useState } from 'react'
import styles from './Room.module.css';

const Room = () => {
  const [clients, setClients] = useState([
    {
      id: 1,
      name: 'Dj'
    },
    {
      id: 2,
      name: 'Don J'
    },
    {
      id: 3,
      name: 'John Doe'
    }
  ]);



  return (
    <div>
      <h1>All connected Users</h1>
      {clients.map(client => (
        <div>
          <audio controls autoplay></audio>
          <h4>{client?.name}</h4>
        </div>
      ))}
    </div>
  )
}

export default Room;
