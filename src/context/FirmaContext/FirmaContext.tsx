import React, { createContext, useState } from 'react'

/* Es crear un contexto. */
const FirmaContext = createContext({});

/**
 * Es una función que devuelve un componente que devuelve un componente
 * @param { children }  - es como parametro un componente hijo que heredara
 * @returns El proveedor está devolviendo el contexto y los niños.
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