import { createContext, useContext, useState, ReactNode } from "react";
import { registerUser, loginUser, logoutUser, updateUser } from "./AuthHelper";
import { AuthContextType, UpdateUserData } from "./AuthType";
import { NavLink } from "react-router-dom";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser && storedUser !== "undefined"
        ? JSON.parse(storedUser)
        : null;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  });

  const register = async (
    name: string,
    email: string,
    password: string,
    cnfPassword: string,
    profilePic?: string
  ) => {
    try {
      const data = await registerUser(
        name,
        email,
        password,
        cnfPassword,
        profilePic
      );
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      console.log("Registration successful:", data);
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const data = await loginUser(email, password);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    logoutUser();
    setUser(null);
    alert("User logged out.");
    <NavLink to="/login" />;
  };

  const updateProfile = async (updatedData: UpdateUserData) => {
    try {
      const updatedUser = await updateUser(updatedData);
      if (!updatedUser) {
        throw new Error("Invalid response from server");
      }
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (err) {
      console.error("updateProfile error:", err);
      throw new Error("Failed to update user profile");
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, register, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
