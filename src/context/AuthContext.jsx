import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch profile when token exists
  const fetchProfile = async (authToken = token) => {
    if (!authToken) {
      setProfile(null);
      return null;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setProfile(data.profile);
        return data.profile;
      } else {
        // If 401 unauthorized, log out
        if (response.status === 401) {
          logout();
        }
        setProfile(null);
        return null;
      }
    } catch (err) {
      console.error("Error loading user profile:", err);
      return null;
    }
  };

  useEffect(() => {
    if (token) {
      fetchProfile(token).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    setToken(data.token);
    setUser(data.user);

    await fetchProfile(data.token);
    return data;
  };

  const register = async (name, email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    setToken(data.token);
    setUser(data.user);

    await fetchProfile(data.token);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    setProfile(null);
  };

  const updateProfileState = (updatedProfile) => {
    setProfile(updatedProfile);
  };

  const value = {
    token,
    user,
    profile,
    loading,
    isAuthenticated: !!token,
    login,
    register,
    logout,
    fetchProfile,
    updateProfileState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
