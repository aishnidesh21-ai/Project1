import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import InstructorDashboard from "./pages/InstructorDashboard";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";

function App() {
  const { loading, token, role } = useContext(AuthContext);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <Router>
      <Header />
      <div className="page-container">
        <Routes>
          {/* Public Routes */}
          {!token && <Route path="/login" element={<Login />} />}
          {!token && <Route path="/register" element={<Register />} />}
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />

          {/* Protected Routes */}
          <Route
            path="/studentdashboard"
            element={<ProtectedRoute allowedRole="student"><StudentDashboard /></ProtectedRoute>}
          />
          <Route
            path="/instructordashboard"
            element={<ProtectedRoute allowedRole="instructor"><InstructorDashboard /></ProtectedRoute>}
          />

          {/* Home route */}
          <Route path="/" element={token ? 
            (role && role.toLowerCase() === "student" ? <Navigate to="/studentdashboard" /> : 
             role && role.toLowerCase() === "instructor" ? <Navigate to="/instructordashboard" /> : 
             <Navigate to="/login" />) : 
            <Navigate to="/login" />} />
          
          {/* Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
