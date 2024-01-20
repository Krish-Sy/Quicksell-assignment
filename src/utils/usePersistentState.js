import { useState, useEffect } from 'react';

const usePersistentState = (key, defaultValue) => {
  const [state, setState] = useState(
    () => {
      const storedValue = window.localStorage.getItem(key);
      return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
    }
  );

  useEffect(() => {
    console.log(`Saving ${key} to localStorage:`, state);
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};

export default usePersistentState;