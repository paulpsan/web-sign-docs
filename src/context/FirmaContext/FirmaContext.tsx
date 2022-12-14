import React, { createContext, useState } from 'react'

const FirmaContext = createContext({});

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