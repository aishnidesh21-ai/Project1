import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load from localStorage on app start
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    const storedName = localStorage.getItem("name");
    const storedEmail = localStorage.getItem("email");

    if (storedToken) {
      setToken(storedToken);
      setRole(storedRole || null);
      setName(storedName || null);
      setEmail(storedEmail || null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("role", role || "");
      localStorage.setItem("name", name || "");
      localStorage.setItem("email", email || "");
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("name");
      localStorage.removeItem("email");
    }
  }, [token, role, name, email]);

  const login = (data) => {
    if (!data) {
      console.error("Invalid login data", data);
      return;
    }

    // Safely extract values regardless of structure
    const tokenValue = data.token || data.user?.token || null;
    const roleValue = data.role || data.user?.role || null;
    const nameValue = data.name || data.user?.name || null;
    const emailValue = data.email || data.user?.email || null;

    setToken(tokenValue);
    setRole(roleValue);
    setName(nameValue);
    setEmail(emailValue);
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    setName(null);
    setEmail(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, role, name, email, login, logout, loading, setLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
