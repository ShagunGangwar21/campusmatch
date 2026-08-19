import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AdmissionForm from "./pages/AdmissionForm";
import Colleges from "./pages/Colleges";
import Recommendations from "./pages/Recommendations";
import CollegeResults from "./pages/CollegeResults";
import CollegeDetails from "./pages/CollegeDetails";
import Favorites from "./pages/Favorites";
import Compare from "./pages/Compare";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* ================= PUBLIC ROUTES ================= */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      {/* ================= PROTECTED ROUTES ================= */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admission" element={<AdmissionForm />} />
        <Route path="/colleges" element={<Colleges />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/results" element={<CollegeResults />} />
        <Route path="/college/:id" element={<CollegeDetails />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/compare" element={<Compare />} />
      </Route>
    </Routes>
  );
}

export default App;