import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import AdmissionForm from "./pages/AdmissionForm";
import Colleges from "./pages/Colleges";
import Recommendations from "./pages/Recommendations";
import CollegeResults from "./pages/CollegeResults";
import CollegeDetails from "./pages/CollegeDetails";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>

      {/* ================= PUBLIC ================= */}

      <Route path="/" element={<Landing />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

      {/* If AdmissionForm is your registration form */}
      <Route
        path="/admission"
        element={<AdmissionForm />}
      />


      {/* ================= PROTECTED ================= */}

      <Route element={<ProtectedRoute />}>

        <Route
          path="/colleges"
          element={<CollegeResults />}
        />

        <Route
          path="/recommendations"
          element={<Recommendations />}
        />

        <Route
          path="/results"
          element={<CollegeResults />}
        />

        <Route
          path="/college/:id"
          element={<CollegeDetails />}
        />

      </Route>

    </Routes>
  );
}

export default App;