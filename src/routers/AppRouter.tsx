import { Navigate, Route, Routes } from "react-router-dom";
import { RenderOnAuthenticated } from "../components/RenderOnAuthenticated";
import { FirmaPages } from "../Firma/pages/FirmaPages";

/**
 * Si el usuario está autenticado, renderice el componente FirmaPages; de lo contrario, redirija a la página de inicio de sesión.
 * @returns Se está devolviendo el <code>&lt;Navegar a={"/firma-page/*"} /&gt;</code>.
 */
export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route
          path="firma-page/*"
          element={
            <RenderOnAuthenticated>
              <FirmaPages />
             </RenderOnAuthenticated>
          }
        />
        <Route path="/*" element={<Navigate to={"/firma-page/*"} />} />
      </Routes>
    </>
  );
};
