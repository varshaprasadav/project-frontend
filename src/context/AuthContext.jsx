import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { authAPI } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    try {
      const result = await authAPI.getProfile();

      if (!result.success) {
        setProfile(null);
        setLoading(false);
        return;
      }

      const data = result.data;

      setProfile({
        userName: data.userName,
        role: data.role,
        isPaid: data.isPaid || false,
        subscriptionStart: data.subscriptionStart || null,
        currentPlan: data.currentPlan || null,
      });

    } catch (err) {
      console.error(err);
      setProfile(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const login = async (email, password) => {
    const result = await authAPI.login(email, password);
    if (!result.success) throw new Error(result.error || "Login failed");
    await fetchProfile();
    return result.data.user;
  };

  const logout = async () => {
    await authAPI.logout();
    setProfile(null);
  };

  return (
    <AuthContext.Provider value={{ profile, loading, login, logout, fetchProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);