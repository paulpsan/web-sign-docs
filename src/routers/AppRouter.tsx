import { Navigate, Route, Routes } from "react-router-dom";
import { RenderOnAuthenticated } from "../components/RenderOnAuthenticated";
import { FirmaPages } from "../Firma/pages/FirmaPages";

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
