import { useEffect, useState } from 'react';

export function useLocalStorageState(initialState, lsKey) {
  const [value, setValue] = useState(function () {
    const storedValue = window.localStorage.getItem(lsKey);

    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(() => {
    window.localStorage.setItem(lsKey, JSON.stringify(value));
  }, [value, lsKey]);

  return { value, setValue };
}
