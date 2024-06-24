import { useState } from 'react';

// @ts-ignore upload only
function useStateEx(initialState) {
  const [state, setState] = useState(initialState);
  const getLatestState = () => {
    return new Promise((resolve, reject) => {
      // @ts-ignore
      setState((s) => {
        resolve(s);
        return s;
      });
    });
  };

  return [state, setState, getLatestState];
}

export default useStateEx;
