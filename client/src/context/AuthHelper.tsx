import { UpdateUserData } from "./AuthType";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// ✅ Register User
export const registerUser = async (
  name: string,
  email: string,
  password: string,
  cnfPassword: string,
  profilePic?: string
) => {
  const response = await fetch("http://localhost:5000/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, cnfPassword, profilePic }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP ${response.status}: ${errorText}`);
  }

  return response.json();
};

// ✅ Login User
export const loginUser = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP ${response.status}: ${errorText}`);
  }

  return response.json();
};

// ✅ Logout User
export const logoutUser = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

export const updateUser = async (updatedData: UpdateUserData) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found in localStorage. Redirecting to login...");
    throw new Error("No token found. Please log in again.");
  }

  const response = await fetch(`${API_URL}/api/user/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
  });

  const responseText = await response.text(); // Get text response
  let errorData;

  try {
    errorData = JSON.parse(responseText); // Try to parse JSON
  } catch {
    throw new Error(`Server error: ${responseText}`); // Handle non-JSON errors
  }

  if (!response.ok) {
    console.error("Backend error:", errorData);
    throw new Error(errorData.message || "Failed to update user profile");
  }

  return errorData;
};
