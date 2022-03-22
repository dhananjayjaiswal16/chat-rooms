import { useRef, useEffect, useCallback } from 'react';
import { useStateWithCallback } from './useStateWithCallback';
import socketInit from '../socket/index';
import { ACTIONS } from '../actions';

export const useRtc = (roomId, user) => {
  //reason why i created this custom hook was because I wanted a callback function to be triggered after client state has been updated
  const [clients, setClients] = useStateWithCallback([]);

  const audioElements = useRef({}); //for storing userId and fetch instance of audioElement for that userId
  const connections = useRef({}); // stroing peerConnections using socketId
  const localMediaStream = useRef(null); //local audio, mic etc data

  const socket = useRef(null);
  useEffect(() => {
    socket.current = socketInit()
  }, [])

  const provideRef = (instance, userId) => {
    audioElements.current[userId] = instance;
  }

  const addNewClient = useCallback((newClient, cb) => {
    const existingUser = clients.find((client) => client.id === newClient.id) // checks if user already exists in clients

    if (existingUser === undefined) {
      setClients((otherClients) => ([...otherClients, newClient]), cb)
    }
  }, [clients, setClients])

  //Capture Media
  useEffect(() => {
    const startCapture = async () => {
      localMediaStream.current = await window.navigator.mediaDevices.getUserMedia({ audio: true });
    }
    startCapture().then(() => {
      addNewClient(user, () => {
        const localElement = audioElements.current[user.id];
        if (localElement) {
          localElement.volume = 0; //if volume !=0 we will hear our own voice
          localElement.srcObject = localMediaStream.current;
        }

        //socket io emit
        socket.current.emit(ACTIONS.JOIN, { roomId, user });
      })
    })
  }, [])

  return { clients, provideRef };
}