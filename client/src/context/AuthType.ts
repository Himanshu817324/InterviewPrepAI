export interface User {
  profilePic: string | null; // Assuming profilePic is a URL or null
  id: string;
  name: string;
  username: string;
  email: string;
  cnfPassword: string;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  profilePic?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (
    name: string,
    email: string,
    password: string,
    cnfPassword: string,
    profilePic?: string
  ) => Promise<void>;
  updateProfile: (updatedUserData: UpdateUserData) => Promise<void>;
}
