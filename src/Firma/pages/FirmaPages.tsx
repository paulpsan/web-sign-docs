import { useState } from "react";
import { SideBar } from "../../UI/components/SideBar/SideBar";
import { Navigate, Route, Routes } from "react-router-dom";
import { Firma } from "../views/Firma/Firma";
import { FirmasPendientes } from "../views/ListaPendientes/FirmasPendientes";
import { ListaFirma } from "../views/ListaFirmas/ListaFirma";
import { GuiaUser } from "../views/GuiaUser/GuiaUser";
import AuthContext from "../../context/AuthContext/AuthContext";
import NavContext from "../../context/NavContext/NavContext";
import { getEnvVariables } from "../../helpers/getEnvVariables";
export const FirmaPages = () => {
  /* Obtener el objeto keycloak del almacenamiento local. */
  const keycloak = JSON.parse(localStorage.getItem('keycloak')!);
  /* Establecer el objeto keycloak en el estado AuthObject. */
  const [AuthObject, setAuthObject] = useState(keycloak);
  /* Una variable de estado que se utiliza para alternar la barra lateral. */
  const [nav, setNav] = useState(true);
  /* Creando un objeto con las propiedades nav y setNav. */
  const value_nav = { nav, setNav };
  /* Crear un objeto con las propiedades AuthObject y setAuthObject. */
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
