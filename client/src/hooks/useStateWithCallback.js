//reason why i created this custom hook was because I wanted a callback function to be triggered after client state has been updated
import { useCallback, useEffect, useRef, useState } from "react"

export const useStateWithCallback = (initialState) => {
  const [state, setState] = useState(initialState)
  const cbRef = useRef();

  const updateState = useCallback((newState, cb) => {
    cbRef.current = cb;
    setState((prev) => {
      return typeof newState === 'function' ? newState(prev) : newState
    })
  }, [])

  useEffect(() => {
    cbRef.current(state);
    cbRef.current = null;
  }, [state]);

  return [state, updateState];
}