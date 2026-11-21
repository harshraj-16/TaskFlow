
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useLocation
} from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import DasboardNav from "./pages/DasboardNav";

import { useAuth } from "./context/AuthContext";


const AppContent = () => {

  const location = useLocation();
  const { user, loading } = useAuth();

  const isDashboard = location.pathname === "/dashboard";

  return (
      <>

          {!loading && isDashboard && user ? (
              <DasboardNav />
          ) : (
              <NavBar />
          )}

          <Routes>

              <Route
                  path="/"
                  element={<Navigate to="/home" replace />}
              />

              <Route path="/home" element={<Home />} />

              <Route path="/login" element={<Login />} />

              <Route path="/signup" element={<SignUp />} />

              <Route
                  path="/dashboard"
                  element={
                      <ProtectedRoute>
                          <Dashboard />
                      </ProtectedRoute>
                  }
              />

              <Route
                  path="*"
                  element={<Navigate to="/home" replace />}
              />

          </Routes>
      </>
  );
};


const App = () => {
  return (
      <BrowserRouter>
          <AppContent />
      </BrowserRouter>
  );
};

export default App;
