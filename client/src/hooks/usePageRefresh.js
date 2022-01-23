import { useState, useEffect } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { setAuth } from '../store/authSlice'

export const usePageRefresh = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/refresh`, {
          withCredentials: true
        });
        //console.log("Response in usePageRefresh", data);
        dispatch(setAuth(data));
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error(err);
      }
    })();
  }, [])

  return { loading };
}