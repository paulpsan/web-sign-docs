import { useState } from "react";
import { SideBar } from "../../UI/components/SideBar/SideBar";
import { Navigate, Route, Routes } from "react-router-dom";
import { Firma } from "../views/Firma/Firma";
import { FirmasPendientes } from "../views/ListaPendientes/FirmasPendientes";
import { ListaFirma } from "../views/ListaFirmas/ListaFirma";
import { GuiaUser } from "../views/GuiaUser/GuiaUser";
import AuthContext from "../../context/AuthContext/AuthContext";
import NavContext from "../../context/NavContext/NavContext";
export const FirmaPages = () => {
/* Getting the keycloak object from local storage. */
  const keycloak = JSON.parse(localStorage.getItem('keycloak')!);
/* Setting the keycloak object to the AuthObject state. */
  const [AuthObject, setAuthObject] = useState(keycloak);
/* A state variable that is used to toggle the sidebar. */
  const [nav, setNav] = useState(true);
/* Creating an object with the properties nav and setNav. */
  const value_nav = { nav, setNav };
/* Creating an object with the properties AuthObject and setAuthObject. */
  const value_auth = { AuthObject, setAuthObject };
  return (
    <>
      <div className="container_app">
        <AuthContext.Provider value={value_auth}>
          <NavContext.Provider value={value_nav}>
            <SideBar keycloak={keycloak}>
              <Routes>
                <Route path="firma" element={<Firma />} />
                <Route path="lista-firma" element={<ListaFirma />} />
                <Route path="guia-user" element={<GuiaUser />} />
                <Route
                  path="firmas-pendientes"
                  element={<FirmasPendientes />}
                />
                <Route path="/*" element={<Navigate to={"firma"} />} />
              </Routes>
            </SideBar>
          </NavContext.Provider>
        </AuthContext.Provider>
      </div>
    </>
  );
};
