import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  profileImage?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
}

// Mock user data - In a real app, this would come from an API
const mockUser: User = {
  id: "EMP001",
  name: "Radha Sharma",
  email: "radha.sharma@incoxis.com",
  role: "HR Manager",
  department: "Human Resources",
  profileImage: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  loading: true,
  error: null,
  
  login: async (email, password) => {
    try {
      set({ loading: true, error: null });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple validation - in a real app, this would be handled by the backend
      if (email === "admin@sharma.com" && password === "Radha@1234") {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify(mockUser));
        
        set({ 
          isAuthenticated: true, 
          user: mockUser,
          loading: false
        });
      } else {
        set({ 
          error: "Invalid email or password", 
          loading: false 
        });
      }
    } catch (error) {
      set({ 
        error: "An error occurred during login", 
        loading: false 
      });
    }
  },
  
  logout: () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    set({ isAuthenticated: false, user: null });
  },
  
  checkAuth: () => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    
    set({ 
      isAuthenticated, 
      user, 
      loading: false 
    });
  }
}));