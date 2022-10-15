import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  // use of lazy initializer to invoke checking local storage only once
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key);
    // return parsed value if it already exists in local storage
    if (jsonValue != null) return JSON.parse(jsonValue);
    // otherwise return initial value based on its type
    if (typeof initialValue === "function") {
      return (initialValue as () => T)();
    }
    return initialValue;
  });
  // storing value in local storage whenever key or value changes
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as [typeof value, typeof setValue];
}
