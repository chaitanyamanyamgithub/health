export interface User {
  id: string;
  email: string;
  name: string;
  role: 'doctor' | 'patient';
  profileImage?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}