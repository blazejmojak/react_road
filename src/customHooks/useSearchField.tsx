import { useState, useEffect } from 'react'


export const useSearchField = (key: string, initialState: string): [string, (newValue: string) => void] => {
    const [value, setValue] = useState(localStorage.getItem(key) || initialState);

    useEffect(() => {
        localStorage.setItem(key, value);
      }, [key, value])

      return (
        [value, setValue]
      )
    
}