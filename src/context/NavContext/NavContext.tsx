import { createContext, useState } from "react";

/* Creating a context object. */
const NavContext = createContext({});

/**
 * It's a function that takes in a child component and returns a NavContext.Provider component that has
 * a value of an object with a nav state and a setNav function.
 * @param {any}  - any - this is a type that allows you to pass any type of data to the component.
 * @returns The NavContext.Provider is being returned.
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
