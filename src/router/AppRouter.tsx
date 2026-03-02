import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./protectedRoute";

import { AdminPage, HomePage, LoginPage } from "../pages";

function AppRouter() {
  return (
    <Routes>
      <Route 
        path="/login" 
        element={<LoginPage />}
      />
      <Route 
        path="/" 
        element={
          <ProtectedRoute allowedRoles={['user', 'admin']}>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<p>Page not found</p>} />
    </Routes>
  );
}

export default AppRouter;
