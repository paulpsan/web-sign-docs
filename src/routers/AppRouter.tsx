import { Navigate, Route, Routes } from "react-router-dom";
import { RenderOnAuthenticated } from "../components/RenderOnAuthenticated";
import { FirmaPages } from "../Firma/pages/FirmaPages";

/**
 * If the user is authenticated, render the FirmaPages component, otherwise redirect to the login page.
 * @returns The <code>&lt;Navigate to={"/firma-page/*"} /&gt;</code> is being returned.
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
