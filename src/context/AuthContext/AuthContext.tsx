import { createContext, useState } from 'react'

/* Creating a context object that is going to be used to pass data down to the components that are
wrapped in the AuthProvider. */
const AuthContext = createContext({});

/**
 * AuthProvider is a function that takes in a children prop and returns a AuthContext.Provider
 * component that has a value prop that is an object with an auth and setAuth property.
 * @param {any}  - any -&gt; this is the type of the props that are passed to the component
 * @returns The AuthProvider is returning a function that returns a function that returns a function
 */
export const AuthProvider = ({ children }: any) => {
    const [auth, setAuth] = useState(undefined);
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext; 