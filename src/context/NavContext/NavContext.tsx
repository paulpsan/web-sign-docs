import { createContext, useState } from "react";

/* Creación de un objeto de contexto. */
const NavContext = createContext({});

/**
 * Es una función que toma un componente secundario y devuelve un componente NavContext.Provider que tiene
 * un valor de un objeto con un estado de navegación y una función setNav.
 * @param { children }  - any - es como parametro un componente hijo que heredara.
 * @returns Se devuelve el NavContext.Provider.
 */
export const NavProider = ( { children }: any ) => {
  const [nav, setNav] = useState(false);
  return (
    <NavContext.Provider value={ { nav, setNav } }>
        {children}
    </NavContext.Provider>
  )
}

export default NavContext;
