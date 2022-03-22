import { useRef, useEffect, useCallback } from 'react';
import { useStateWithCallback } from './useStateWithCallback';
import socketInit from '../socket/index';
import { ACTIONS } from '../actions';
import freeice from 'freeice';
import { connection } from 'mongoose';

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


  useEffect(() => {
    const handleNewPeer = async ({ peerId, createOffer, user: remoteUser }) => {
      if (peerId in connections.current) {
        return console.warn(`You are already connected with ${peerId} (${user.name})`);
      }

      connections.current[peerId] = new RTCPeerConnection({
        iceServers: freeice() //ice servers give our local machine info about our public ID of router
      })

      connections.current[peerId].onicecandidate = (e) => {
        socket.current.emit(ACTIONS.RELAY_ICE, {
          peerId,
          icecandidate: e.icecandidate
        })
      }

      //Handle on track on this connection (handle new stream)
      connections.current[peerId].ontrack = ({ streams: [remoteStream] }) => {
        addNewClient(remoteUser, () => {
          if (audioElements.current[remoteUser.id]) {
            audioElements.current[remoteUser.id].srcObject = remoteStream
          } else {
            //this step may take when many clients are present
            let settled = false;
            const interval = setInterval(() => {
              //this will check every second whether audio instance is added or not and as soon as intance mounts interval is cleared
              if (audioElements.current[remoteUser.id]) {
                audioElements.current[remoteUser.id].srcObject = remoteStream;
                settled = true;
              }
              if (settled) {
                clearInterval(interval)
              }
            }, 1000)
          }
        })
      }

      //Add local track to remote connection
      localMediaStream.current.getTracks().forEach(track => {
        connections.current[peerId].addTrack(track, localMediaStream.current)
      })

      //createOffer
      if (createOffer) {
        const offer = await connections.current[peerId].createOffer();
        //connections.current[peerId].setLocalDescription(offer);

        //send offer to another client
        socket.current.emit(ACTIONS.RELAY_SDP, {
          peerId,
          sessionDescription: offer
        });
      }
    }

    socket.current.on(ACTIONS.ADD_PEER, handleNewPeer);

    return () => {
      socket.current.off(ACTIONS.ADD_PEER)
    }
  }, [])

  return { clients, provideRef };
}