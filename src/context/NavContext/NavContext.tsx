import { createContext, useState } from "react";


const NavContext = createContext({});

export const NavProider = ( { children }: any ) => {
  const [nav, setNav] = useState(false);
  return (
    <NavContext.Provider value={ { nav, setNav } }>
        {children}
    </NavContext.Provider>
  )
}

export default NavContext;
