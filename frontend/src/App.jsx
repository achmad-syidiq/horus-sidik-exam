import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import { useAuth } from "./store/useAuth";

export default function App() {
  const { isLoggedIn } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!isLoggedIn ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}
