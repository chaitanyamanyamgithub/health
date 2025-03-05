import { create } from 'zustand';
import { AuthState } from '../types/auth';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  login: async (email: string, password: string) => {
    try {
      // TODO: Implement actual API call
      const mockUser = {
        id: '1',
        email,
        name: 'John Doe',
        role: 'doctor' as const,
        profileImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400',
      };
      const mockToken = 'mock-jwt-token';
      
      set({
        user: mockUser,
        token: mockToken,
        isAuthenticated: true,
      });
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },
  logout: () => {
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },
}));