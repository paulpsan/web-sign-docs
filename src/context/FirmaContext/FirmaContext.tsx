import React, { createContext, useState } from 'react'

/* It's creating a context. */
const FirmaContext = createContext({});

/**
 * It's a function that returns a component that returns a component
 * @param {any}  - firma is the signature image
 * @returns The provider is returning the context and the children.
 */
export const FirmaProvider = ({ children }: any) => {
    const [firma, setFirma] = useState(0);
    const [id_signature, setid_signature] = useState(0)
    return (
        <FirmaContext.Provider value={{ firma, setFirma, id_signature, setid_signature }}>
            {children}
        </FirmaContext.Provider>
    )
}
export default FirmaContext; 