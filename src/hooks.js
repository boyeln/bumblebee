import React from "react";

export function useLocalStorage(localStorageKey, defaultValue = "") {
  const [value, setValue] = React.useState(
    localStorage.getItem(localStorageKey) || defaultValue
  );
  
  React.useEffect(() => {
    localStorage.setItem(localStorageKey, value);
  }, [value]);
  
  return [value, setValue];
};