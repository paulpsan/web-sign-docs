import React, { createContext, useEffect, useState } from 'react'

/* Creación de un objeto de contexto. */
export const StepsContext = createContext({});

/**
 * StepsProvider es una función que toma un accesorio para niños y devuelve un StepsContext.Provider
 * componente que tiene una propiedad de valor que es un objeto con una propiedad actual y setCurrent.
 * @param {children}  - any -&gt; esta es una sintaxis mecanografiada que significa que el parámetro puede ser de cualquier
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
