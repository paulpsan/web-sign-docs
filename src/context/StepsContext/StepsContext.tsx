import React, { createContext, useEffect, useState } from 'react'

export const StepsContext = createContext({});

export const StepsProvider = ({ children } : any) =>{
    const [ current, setCurrent ] = useState(0);
    return(
        <StepsContext.Provider value={{ current, setCurrent }}>
            {children}
        </StepsContext.Provider>
    )
}
