import { createContext, useState } from 'react'

/* Crear un objeto de contexto que se utilizará para pasar datos a los componentes que están
envuelto en el AuthProvider. */
const AuthContext = createContext({});

/**
 * AuthProvider es una función que toma un accesorio para niños y devuelve un AuthContext.Provider
 * componente que tiene una propiedad de valor que es un objeto con una propiedad auth y setAuth.
 * @param {children}  - any -&gt; es como parametro un componente hijo que heredara
 * @returns El AuthProvider devuelve una función que devuelve una función que devuelve una función
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