import { useState } from 'react';
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

  return { clients };
}