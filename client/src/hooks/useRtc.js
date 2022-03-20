import { useRef, useState } from 'react';
import { useStateWithCallback } from './useStateWithCallback';
export const useRtc = (roomId, user) => {
  //reason why i created this custom hook was because I wanted a callback function to be triggered after client state has been updated
  const [clients, setClients] = useStateWithCallback([
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

  const audioElements = useRef({}); //for storing userId and fetch instance of audioElement for that userId
  const connections = useRef({}); // stroing peerConnections using socketId
  const localMediaStream = useRef(null); //local audio, mic etc data


  const provideRef = (instance, userId) => {
    audioElements.current[userId] = instance;
  }
  return { clients, provideRef };
}