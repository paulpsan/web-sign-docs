import React, { createContext, useEffect, useState } from 'react'

/* Creating a context object. */
export const StepsContext = createContext({});

/**
 * StepsProvider is a function that takes in a children prop and returns a StepsContext.Provider
 * component that has a value prop that is an object with a current and setCurrent property.
 * @param {any}  - any -&gt; this is a typescript syntax that means that the parameter can be of any
 * type.
 * @returns The children of the component.
 */
export const StepsProvider = ({ children } : any) =>{
    const [ current, setCurrent ] = useState(0);
    return(
        <StepsContext.Provider value={{ current, setCurrent }}>
            {children}
        </StepsContext.Provider>
    )
}
