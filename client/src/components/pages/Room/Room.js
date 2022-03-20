import React, { useState } from 'react'
import { useRtc } from '../../../hooks/useRtc';
import styles from './Room.module.css';
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Room = () => {
  const { id: roomId } = useParams();
  const user = useSelector(state => state?.authSlice?.user);
  const { clients, provideRef } = useRtc(roomId, user);
  return (
    <div>
      <h1>All connected Users</h1>
      {clients?.map(client => (
        <div key={client.id}>
          <audio
            ref={(instance) => provideRef(instance, client.id)}
            controls
            autoPlay
          >
          </audio>
          <h4>{client?.name}</h4>
        </div>
      ))}
    </div>
  )
}

export default Room;
