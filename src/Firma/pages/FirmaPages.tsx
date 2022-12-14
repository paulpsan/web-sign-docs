import React, { useEffect, useState } from "react";
import NavContext from "../../context/NavContext/NavContext";
import { SideBar } from "../../UI/components/SideBar/SideBar";
import { Navigate, Route, Routes } from "react-router-dom";
import { Firma } from "../views/Firma/Firma";
import { FirmasPendientes } from "../views/ListaPendientes/FirmasPendientes";
import { ListaFirma } from "../views/ListaFirmas/ListaFirma";
import AuthContext from "../../context/AuthContext/AuthContext";
export const FirmaPages = () => {
  const keycloak = JSON.parse(localStorage.getItem('keycloak')!);
  const [AuthObject, setAuthObject] = useState(keycloak);
  const [nav, setNav] = useState(true);
  const value_nav = { nav, setNav };
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
