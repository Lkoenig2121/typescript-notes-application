import { useEffect, useState } from "react"

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
    const [value, setValue] = useState<T>(() => { // Using function version to check if this state is in local storage
        const jsonValue = localStorage.getItem(key)
        // JsonValue because stored in local storage
        if (jsonValue == null) {
            if (typeof initialValue === "function") {
                return (initialValue as () => T)() // This initial value is a function that returns a type of T or whatever
            } else {
                return initialValue
            }
        } else {
            return JSON.parse(jsonValue)
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value, key]) // Everytime value or key changes were gonna set item at that key to stringified JSON version of that value 

    return [value, setValue] as [T, typeof setValue] // Inital type is T and then whatevers the state of setValue
}

// Please ask for assistance with this King Lukey!!!!!!!!!!
// This is just for useLocalStorage :)