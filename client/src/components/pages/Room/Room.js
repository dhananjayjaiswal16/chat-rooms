import React, { useState } from 'react'
import { useRtc } from '../../../hooks/useRtc';
import styles from './Room.module.css';

const Room = () => {
  const { clients } = useRtc();
  return (
    <div>
      <h1>All connected Users</h1>
      {clients?.map(client => (
        <div key={client.id}>
          <audio controls autoplay></audio>
          <h4>{client?.name}</h4>
        </div>
      ))}
    </div>
  )
}

export default Room;
